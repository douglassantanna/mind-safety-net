using api.Users.Dtos;
using api.Users.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Users;
public static class UserApi
{
    public static RouteGroupBuilder MapUsers(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/users");

        group.MapPost("/create", async (IUserService userService,
                                        [FromBody] CreateUserRequest request) =>
        {
            var response = await userService.CreateUserAsync(request);
            return response.Success ?
             Results.Created("", response.Data) :
             Results.UnprocessableEntity(response.Data);
        });

        group.MapGet("/list-users", async (IUserService userService) =>
       {
           var users = await userService.ListAllUsers(default);
           return Results.Ok(users);
       });

        return group;
    }
}
