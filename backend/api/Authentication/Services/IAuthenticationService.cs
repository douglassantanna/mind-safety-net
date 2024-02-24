using api.Authentication.Dtos;
using api.Data;
using api.Shared;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace api.Authentication.Services;
public interface IAuthenticationService
{
    Task<Response> LoginAsync(LoginRequest request);
}
public class AuthenticationService(DataContext context,
                                   ITokenService tokenService,
                                   IEncryptService encryptService,
                                   IValidator<LoginRequest> validator) : IAuthenticationService
{
    private readonly DataContext _context = context;
    private readonly ITokenService _tokenService = tokenService;
    private readonly IValidator<LoginRequest> _validator = validator;

    private readonly IEncryptService _encryptService = encryptService;
    public async Task<Response> LoginAsync(LoginRequest request)
    {
        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return new Response("", false, errors);
        }

        var user = await _context.Users.Where(u => u.Email == request.Email).FirstOrDefaultAsync(default);
        if (user is null)
            return new Response("User not found", false, 404);

        bool matchPassword = _encryptService.IsPasswordValid(user.Password, request.Password);
        if (!matchPassword)
            return new Response("Password is incorrect", false, 401);

        var token = _tokenService.GenerateToken(user);
        return new Response("", true, new { token });
    }
}