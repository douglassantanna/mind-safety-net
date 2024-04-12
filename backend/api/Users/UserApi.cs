using api.Users.Dtos;
using api.Users.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Users;
public static class PatientApi
{
    public static RouteGroupBuilder MapUsers(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/users");

        group.MapPost("/create", async (IUserService userService,
                                        [FromBody] CreateUserRequest request) =>
        {
            var response = await userService.CreateAsync(request);
            return response.Success ?
             Results.Created("", response.Data) :
             Results.UnprocessableEntity(response.Data);
        });

        group.MapPut("/edit", async (IUserService userService,
                                     [FromBody] EditUserRequest request) =>
        {
            var response = await userService.EditAsync(request);
            if (response.Success)
            {
                return Results.Ok(response.Data);
            }

            return response.Data is 404 ?
            Results.NotFound(response.Message) :
            Results.UnprocessableEntity(response.Data);
        });

        group.MapGet("/list", async (IUserService userService) =>
       {
           var users = await userService.ListAllAsync(default);
           return Results.Ok(users);
       });

        return group;
    }
}
