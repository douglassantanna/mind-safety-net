using api.Data;
using api.Patients.Dtos;
using api.Patients.Models;
using api.Shared;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace api.Patients.Services;
public interface IPatientService
{
    Task<Response> CreateAsync(CreatePatientRequest request);
    Task<IEnumerable<ViewPatientDTO>> ListAsync(CancellationToken ct);
    Task<Response> GetByIdAsync(int id);
}
public class PatientService(
    DataContext context,
    IValidator<CreatePatientRequest> createPatientvalidator) : IPatientService
{
    private readonly DataContext _context = context;
    private readonly IValidator<CreatePatientRequest> _createPatientvalidator = createPatientvalidator;
    public async Task<Response> CreateAsync(CreatePatientRequest request)
    {
        var validationResult = await _createPatientvalidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return new Response("", false, errors);
        }

        var questionsToAdd = _context.Questions
                                    .Include(q => q.Answers)
                                    .Where(q => request.Questions.Select(x => x.QuestionId).Contains(q.Id))
                                    .ToList();

        if (!questionsToAdd.Any()) return new Response("No questions found!", false);

        var patient = new Patient(
            request.FullName,
            request.Email,
            request.PhoneNumber,
            questionsToAdd
        );

        try
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {0}", ex.Message);
        }

        return new Response("", true, patient.Id);
    }

    public async Task<Response> GetByIdAsync(int id)
    {
        try
        {
            var patient = await _context.Patients
                                        .Include(x => x.Questions)
                                            .ThenInclude(x => x.Answers)
                                        .FirstOrDefaultAsync(p => p.Id == id);

            if (patient is null) return new Response("Patient not found!", false, 404);

            IEnumerable<ViewQuestions> questionsDto = patient.Questions.Select(q => new ViewQuestions(
                                                            q.Id,
                                                            q.Description,
                                                            q.Answers.Select(a => new ViewAnswer(
                                                                a.Id,
                                                                a.Description,
                                                                a.Value
                                                            )).ToList()
                                                        )).ToList();
            ViewPatientProfileDTO patientDTO = new(
                patient.Id,
                patient.FullName,
                patient.PhoneNumber,
                patient.Email,
                patient.DateSubmittedForm,
                patient.Priority,
                questionsDto);

            return new Response("", true, patientDTO);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {0}", ex.Message);
            return new Response($"Error: {ex.Message}", false, 500);
        }
    }

    public async Task<IEnumerable<ViewPatientDTO>> ListAsync(CancellationToken ct)
    {
        IEnumerable<ViewPatientDTO> viewPatients = [];
        try
        {
            viewPatients = await _context.Patients.Select(p => new ViewPatientDTO(p.Id, p.FullName, p.Email, p.DateSubmittedForm, p.Priority)).ToListAsync(cancellationToken: ct);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {0}", ex.Message);
        }
        return viewPatients;
    }
}