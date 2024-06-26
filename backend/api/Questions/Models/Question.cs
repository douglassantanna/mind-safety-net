using api.Questions.Dtos;
using api.Shared;

namespace api.Questions.Models;
public class Question : Entity
{
    public Question(string description, IEnumerable<CreateAnswerDTO> answers)
    {
        Description = description;
        Enabled = true;
        AddAnswers(answers);
    }
    protected Question()
    { }
    public string Description { get; set; } = string.Empty;
    public bool Enabled { get; set; }
    private readonly List<Answer> _answers = [];
    public IReadOnlyCollection<Answer> Answers => _answers.AsReadOnly();
    private void AddAnswers(IEnumerable<CreateAnswerDTO> answerDTOs)
    {
        foreach (var item in answerDTOs)
        {
            _answers.Add(new Answer { Description = item.Description, Value = item.Value });
        }
    }

    internal void SetEnableStatus(bool enableStatus)
    {
        Enabled = enableStatus;
    }
}
