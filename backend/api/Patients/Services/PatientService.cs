using api.Data;
using api.Patients.Dtos;
using api.Patients.Models;
using api.Shared;
using FluentValidation;

namespace api.Patients.Services;
public interface IPatientService
{
    Task<Response> CreatePatientAsync(CreatePatientRequest request);
    Task<List<ViewPatientDTO>> ListAllPatients(CancellationToken ct);
}
public class PatientService(
    DataContext context,
    IValidator<CreatePatientRequest> createPatientvalidator) : IPatientService
{
    private readonly DataContext _context = context;
    private readonly IValidator<CreatePatientRequest> _createPatientvalidator = createPatientvalidator;

    public async Task<Response> CreatePatientAsync(CreatePatientRequest request)
    {
        var validationResult = await _createPatientvalidator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return new Response("", false, errors);
        }

        var patient = new Patient
        {
            FullName = request.FullName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber
        };

        // aqui temos que ir ate o banco de dados, obter a pergunta pelo id que é enviado do frontend
        // e gravar na entidade Patient todas as perguntasId e respostaId.

        _context.Patients.Add(patient);
        await _context.SaveChangesAsync();

        return new Response("", true, patient.Id);
    }

    public Task<List<ViewPatientDTO>> ListAllPatients(CancellationToken ct)
    {
        throw new NotImplementedException();
    }
}