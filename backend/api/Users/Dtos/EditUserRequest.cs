using api.Users.Models;
using FluentValidation;

namespace api.Users.Dtos;
public record EditUserRequest(
    string FullName,
    string Email,
    Role Role,
    bool Active,
    int Id
);

public class EditUserRequestValidator : AbstractValidator<EditUserRequest>
{
    public EditUserRequestValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty()
            .WithMessage("FullName is required.")
            .MaximumLength(255)
            .WithMessage("FullName can't be longer than {1} characters.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Please enter a valid email address.")
            .MaximumLength(255)
            .WithMessage("Email must be between 1 and {1} characters.");

    }
}