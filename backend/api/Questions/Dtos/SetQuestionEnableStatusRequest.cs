using FluentValidation;

namespace api.Questions.Dtos;
public record SetQuestionEnableStatusRequest(int QuestionId, bool EnableStatus);
public class SetQuestionEnableStatusRequestValidator : AbstractValidator<SetQuestionEnableStatusRequest>
{
    public SetQuestionEnableStatusRequestValidator()
    {
        RuleFor(x => x.QuestionId)
            .NotEmpty()
            .WithMessage("QuestionId can't be empty.");
    }
}