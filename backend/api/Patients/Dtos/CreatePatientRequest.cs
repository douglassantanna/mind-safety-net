using FluentValidation;

namespace api.Patients.Dtos;
public record CreatePatientRequest(string FullName,
                                   string Email,
                                   string PhoneNumber,
                                   List<ViewQuestions> Questions);

public class CreatePatientRequestValidator : AbstractValidator<CreatePatientRequest>
{
  public CreatePatientRequestValidator()
  {
    RuleFor(x => x.FullName)
        .MaximumLength(255)
        .WithMessage("FullName can't be longer than {1} characters.");

    RuleFor(x => x.PhoneNumber)
        .MaximumLength(255)
        .WithMessage("PhoneNumber can't be longer than {1} characters.");

    RuleFor(x => x.Email)
        .NotEmpty()
        .WithMessage("Email is required.")
        .EmailAddress()
        .WithMessage("Please enter a valid email address.")
        .MaximumLength(255)
        .WithMessage("Email must be between 1 and {1} characters.");
  }
}