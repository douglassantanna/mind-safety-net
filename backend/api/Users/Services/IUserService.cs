using api.Data;
using api.Shared;
using api.Users.Dtos;
using api.Users.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace api.Users.Services;
public interface IUserService
{
    Task<Response> CreateAsync(CreateUserRequest request);
    Task<Response> EditAsync(EditUserRequest request);
    Task<List<ViewUserDTO>> ListAllAsync(CancellationToken ct);
    Task<bool> UserExists(string email);
}

public class UserService(DataContext context,
                         IPasswordHelper passwordHelper,
                         IValidator<CreateUserRequest> createUservalidator,
                         IValidator<EditUserRequest> editUservalidator) : IUserService
{
    private readonly DataContext _context = context;
    private readonly IPasswordHelper _passwordHelper = passwordHelper;
    private readonly IValidator<CreateUserRequest> _createUservalidator = createUservalidator;
    private readonly IValidator<EditUserRequest> _editUservalidator = editUservalidator;
    public async Task<Response> CreateAsync(CreateUserRequest request)
    {
        var validationResult = await _createUservalidator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return new Response("", false, errors);
        }

        var randomPassword = _passwordHelper.RandomPassword();

        var encryptedPassword = _passwordHelper.EncryptPassword(randomPassword);

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            Password = encryptedPassword,
            Role = request.Role,
            Active = request.Active
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new Response("", true, user.Id);
    }

    public async Task<Response> EditAsync(EditUserRequest request)
    {
        var validationResult = await _editUservalidator.ValidateAsync(request);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors.Select(e => e.ErrorMessage);
            return new Response("", false, errors);
        }

        var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == request.Id);
        if (user is null) return new Response("User not found", false, 404);

        user.EditUser(request.FullName, request.Email, request.Role, request.Active);
        _context.Users.Update(user);
        await _context.SaveChangesAsync();

        return new Response("", true, user.Id);
    }

    public async Task<List<ViewUserDTO>> ListAllAsync(CancellationToken ct) => await _context.Users.Select(user => new ViewUserDTO(user.Id, user.FullName, user.Email, user.Role,
                                                                                                                                               user.Active)).ToListAsync(ct);

    public async Task<bool> UserExists(string email) => await _context.Users.AnyAsync(u => u.Email == email);
}