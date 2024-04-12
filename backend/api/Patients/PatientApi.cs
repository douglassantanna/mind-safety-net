using api.Patients.Dtos;
using api.Patients.Services;
using api.Users.Models;
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
            var response = await patientService.CreateAsync(request);
            return response.Success ?
             Results.Created("", response.Data) :
             Results.UnprocessableEntity(response.Data);
        });

        group.MapPut("/update-safety-plan", async (IPatientService patientService,
                                                    [FromBody] EditSafetyPlan request) =>
        {
            var response = await patientService.UpdateSafetyPlanAsync(request);
            return response.Data is 404 ?
            Results.NotFound(response.Message) :
            Results.UnprocessableEntity(response.Data);
        });

        group.MapGet("/list", async (IPatientService patientService) =>
       {
           var patients = await patientService.ListAsync(default);
           return Results.Ok(patients);
       });

        group.MapGet("/get-by-id/{id}", async (int id, IPatientService patientService) =>
       {
           var patients = await patientService.GetByIdAsync(id);
           return Results.Ok(patients);
       });

        return group;
    }
}
