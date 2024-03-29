using api.Authentication.Dtos;
using api.Authentication.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Authentication;
public static class AuthenticationApi
{
    public static RouteGroupBuilder MapAuthentication(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/authentication");

        group.MapPost("/login", async (
            [FromBody] LoginRequest request,
            IAuthenticationService authenticationService
            ) =>
        {
            var response = await authenticationService.LoginAsync(request);
            if (!response.Success)
            {
                return response.Data switch
                {
                    401 => Results.Unauthorized(),
                    _ => Results.NotFound(),
                };
            }
            return Results.Ok(response.Data);
        });
        return group;
    }
}
