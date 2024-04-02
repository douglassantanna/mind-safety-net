using api.Patients.Dtos;
using api.Patients.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Patients;
public static class PatientApi
{
    public static RouteGroupBuilder MapPatients(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/patients");

        group.MapPost("/create", async (IPatientService patientService,
                                        [FromBody] CreatePatientRequest request) =>
        {
            var response = await patientService.CreatePatientAsync(request);
            return response.Success ?
             Results.Created("", response.Data) :
             Results.UnprocessableEntity(response.Data);
        });

        group.MapGet("/list", async (IPatientService patientService) =>
       {
           var patients = await patientService.ListAllPatients(default);
           return Results.Ok(patients);
       });

        return group;
    }
}
