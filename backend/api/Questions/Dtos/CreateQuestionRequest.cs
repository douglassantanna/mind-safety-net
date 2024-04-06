using FluentValidation;

namespace api.Questions.Dtos;
public record CreateQuestionRequest(string Description, IEnumerable<CreateAnswerDTO> Answers);
public record CreateAnswerDTO(string Description, int Value);

public class CreateQuestionRequestValidator : AbstractValidator<CreateQuestionRequest>
{
    public CreateQuestionRequestValidator()
    {
        RuleFor(x => x.Description)
            .MaximumLength(500)
            .WithMessage("Description can't be longer than {1} characters.");


        RuleForEach(x => x.Answers).ChildRules(a =>
        {
            a.RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Answer description is required.")
                .MaximumLength(500).WithMessage("Answer description must be between 1 and {1} characters.");
        });
    }
}