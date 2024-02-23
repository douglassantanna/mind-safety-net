using api.Data;
using api.Shared;
using api.Users.Dtos;
using api.Users.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace api.Users.Services;
public interface IUserService
{
    Task<Response> CreateUserAsync(CreateUserRequest request);
    Task<List<ViewUserDTO>> ListAllUsers(CancellationToken ct);
}

public class UserService(DataContext context, IEncryptService encryptService, IValidator<CreateUserRequest> validator) : IUserService
{
    private readonly DataContext _context = context;
    private readonly IEncryptService _encryptService = encryptService;
    private readonly IValidator<CreateUserRequest> _validator = validator;
    public async Task<Response> CreateUserAsync(CreateUserRequest request)
    {
        var validationResult = await _validator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return new Response("", false, errors);
        }

        var hashedPassword = _encryptService.HashPassword(request.Password);

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            Password = hashedPassword,
            Role = request.Role
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new Response("", true, user.Id);
    }

    public async Task<List<ViewUserDTO>> ListAllUsers(CancellationToken ct)
    {
        return await _context.Users.Select(user => new ViewUserDTO(user.FullName, user.Email, user.Role)).ToListAsync(ct);
    }
}

