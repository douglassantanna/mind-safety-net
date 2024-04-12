using api.Data;
using api.Patients.Dtos;
using api.Patients.Models;
using api.Shared;
using api.Users.Dtos;
using api.Users.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace api.Patients.Services;
public interface IPatientService
{
    Task<Response> CreateAsync(CreatePatientRequest request);
    Task<IEnumerable<ViewPatientDTO>> ListAsync(CancellationToken ct);
    Task<Response> GetByIdAsync(int id);
    Task<Response> UpdateSafetyPlanAsync(EditSafetyPlan request);
}
public class PatientService(
    DataContext context,
    IValidator<CreatePatientRequest> createPatientvalidator,
    IUserService userService) : IPatientService
{
    private readonly DataContext _context = context;
    private readonly IValidator<CreatePatientRequest> _createPatientValidator = createPatientvalidator;
    private readonly IUserService _userService = userService;

    public async Task<Response> CreateAsync(CreatePatientRequest request)
    {
        var validationResult = await _createPatientValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return new Response("Validation failed", false, errors);
        }

        var userExists = await _userService.UserExists(request.Email);
        if (userExists)
            return new Response("A user with the provided email already exists. Try to log in.", false, 409);

        try
        {
            var userToCreate = new CreateUserRequest(request.FullName, request.Email, Users.Models.Role.Patient, true);
            await _userService.CreateAsync(userToCreate);

            var questionsToAdd = await _context.Questions
                .Include(q => q.Answers)
                .Where(q => request.Questions.Select(x => x.QuestionId).Contains(q.Id))
                .ToListAsync();

            if (!questionsToAdd.Any())
            {
                return new Response("No questions found!", false);
            }

            var selectedAnswersId = request.Questions.Select(q => q.AnswerId).ToList();
            var answersId = selectedAnswersId.Select(item => new SelectedAnswerId { AnswerId = item }).ToList();

            var patient = new Patient(
                request.FullName,
                request.Email,
                request.PhoneNumber,
                questionsToAdd,
                answersId
            );

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return new Response("", true, patient.Id);
        }
        catch (DbUpdateException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return new Response($"Error: {ex.Message}", false, 500);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Unexpected error: {ex.Message}");
            return new Response($"Unexpected error: {ex.Message}", false, 500);
        }
    }

    public async Task<Response> UpdateSafetyPlanAsync(EditSafetyPlan request)
    {
        var safetyPlan = await _context.SafetyPlans.Where(x => x.PatientId == request.PatientId).FirstOrDefaultAsync();
        if (safetyPlan is null)
            return new Response("Safety plan not found!", false, 404);

        safetyPlan.Update(request.WarningSigns,
                          request.Distractions,
                          request.ReasonsForLiving,
                          request.SituationFever,
                          request.ProfessionalSupport);

        try
        {
            _context.SafetyPlans.Update(safetyPlan);
            await _context.SaveChangesAsync();
            return new Response("Ok");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return new Response($"Error:{ex.Message}", false, 500);
        }
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