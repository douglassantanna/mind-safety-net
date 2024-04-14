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
    Task<Response> GetSafetyPlanByEmailAsync(string patientEmail);
    Task<Response> UpdateSafetyPlanAsync(string patientEmail, EditSafetyPlan request);
    Task<Response> ScheduleAppointmentAsync(string patientEmail, ScheduleAppointmentRequest request);
    Task<Response> UpdateSelfCareAsync(string patientEmail, UpdateSelfCareRequest request);
    Task<Response> GetSelfCareByEmailAsync(string email);
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

    public async Task<Response> UpdateSafetyPlanAsync(string patientEmail, EditSafetyPlan request)
    {
        var safetyPlan = await _context.SafetyPlans
                                    .FirstOrDefaultAsync(x => x.PatientEmail.ToLower() == patientEmail.ToLower());
        if (safetyPlan is null)
            return new Response("Safety plan not found!", false, 404);

        safetyPlan.Update(request.WarningSigns,
                                  request.Distractions,
                                  request.ReasonsForLiving,
                                  request.SituationFever,
                                  request.ProfessionalSupport,
                                  patientEmail);

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
                                        .AsNoTracking()
                                        .Include(x => x.SafetyPlan)
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
                patient.IsScheduled,
                patient.Appointment,
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
            viewPatients = await _context.Patients.Select(p => new ViewPatientDTO(p.Id,
                                                                                  p.FullName,
                                                                                  p.Email,
                                                                                  p.DateSubmittedForm,
                                                                                  p.Priority,
                                                                                  p.IsScheduled,
                                                                                  p.Appointment))
                                                                                  .ToListAsync(cancellationToken: ct);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {0}", ex.Message);
        }
        return viewPatients;
    }

    public async Task<Response> GetSafetyPlanByEmailAsync(string patientEmail)
    {
        try
        {
            var safetyPlan = await _context.SafetyPlans
                                        .AsNoTracking()
                                        .FirstOrDefaultAsync(p => p.PatientEmail.ToLower() == patientEmail.ToLower());

            if (safetyPlan is null) return new Response("Patient not found!", false, 404);

            ViewSafetyPlan safetyPlanDto = new(safetyPlan.Id,
                                               safetyPlan.WarningSigns,
                                               safetyPlan.Distractions,
                                               safetyPlan.ReasonsForLiving,
                                               safetyPlan.SituationFever,
                                               safetyPlan.ProfessionalSupport); ;

            return new Response("", true, safetyPlanDto);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {0}", ex.Message);
            return new Response($"Error: {ex.Message}", false, 500);
        }
    }

    public async Task<Response> ScheduleAppointmentAsync(string patientEmail, ScheduleAppointmentRequest request)
    {
        var patient = await _context.Patients
                                    .FirstOrDefaultAsync(x => x.Email.ToLower() == patientEmail.ToLower());
        if (patient is null)
            return new Response("Patient plan not found!", false, 404);

        try
        {
            patient.ScheduleAppointment(request);

            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
            return new Response("Ok");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return new Response($"Error:{ex.Message}", false, 500);
        }
    }

    public async Task<Response> UpdateSelfCareAsync(string patientEmail, UpdateSelfCareRequest request)
    {
        var selfCare = await _context.SelfCares
                                    .FirstOrDefaultAsync(x => x.PatientEmail.ToLower() == patientEmail.ToLower());
        if (selfCare is null)
            return new Response("Self care not found!", false, 404);

        selfCare.Update(request.PositivePoints,
                        request.PointsToImprove,
                        request.Strategies,
                        patientEmail);

        try
        {
            _context.SelfCares.Update(selfCare);
            await _context.SaveChangesAsync();
            return new Response("Ok");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return new Response($"Error:{ex.Message}", false, 500);
        }
    }

    public Task<Response> GetSelfCareByEmailAsync(string email)
    {
        throw new NotImplementedException();
    }
}