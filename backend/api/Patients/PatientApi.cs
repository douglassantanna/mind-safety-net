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

        group.MapPut("/update-safety-plan/{email}", async (string email,
                                                           IPatientService patientService,
                                                           [FromBody] EditSafetyPlan request) =>
        {
            var response = await patientService.UpdateSafetyPlanAsync(email, request);
            return response.Data is 404 ?
            Results.NotFound(response.Message) :
            response.Data is 500 ?
            Results.BadRequest(response.Data) :
            Results.Ok();
        });

        group.MapPut("/schedule-appointment/{email}", async (string email,
                                                            IPatientService patientService,
                                                            [FromBody] ScheduleAppointmentRequest request) =>
        {
            var response = await patientService.ScheduleAppointmentAsync(email, request);
            return response.Data is 404 ?
            Results.NotFound(response.Message) :
            response.Data is 500 ?
            Results.BadRequest(response.Data) :
            Results.Ok();
        });

        group.MapGet("/list", async (IPatientService patientService) =>
       {
           var patients = await patientService.ListAsync(default);
           return Results.Ok(patients);
       });

        group.MapGet("/get-by-id/{id}", async (int id, IPatientService patientService) =>
       {
           var patient = await patientService.GetByIdAsync(id);
           return Results.Ok(patient);
       });

        group.MapGet("/get-safety-plan-by-email/{email}", async (string email, IPatientService patientService) =>
       {
           var safetyPlan = await patientService.GetSafetyPlanByEmailAsync(email);
           return Results.Ok(safetyPlan);
       });

        group.MapGet("/get-self-care-by-email/{email}", async (string email, IPatientService patientService) =>
       {
           var selfCare = await patientService.GetSelfCareByEmailAsync(email);
           return Results.Ok(selfCare);
       });


        group.MapPut("/update-self-care/{email}", async (string email,
                                                           IPatientService patientService,
                                                           [FromBody] UpdateSelfCareRequest request) =>
        {
            var response = await patientService.UpdateSelfCareAsync(email, request);
            return response.Data is 404 ?
            Results.NotFound(response.Message) :
            response.Data is 500 ?
            Results.BadRequest(response.Data) :
            Results.Ok();
        });

        group.MapDelete("/delete/{id}", (int id, IPatientService patientService) =>
        {
            var response = patientService.Delete(id);
            return Results.Ok();
        });

        return group;
    }
}
