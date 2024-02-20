using api.Shared;

namespace api.SuicideForms.Models;
public class Question : Entity
{
    public string Description { get; set; } = string.Empty;
    private readonly List<Answer> _answers = [];
    public IReadOnlyCollection<Answer> Answers => _answers.AsReadOnly();
}
public class Answer : Entity
{
    public string Description { get; set; } = string.Empty;
    public int Value { get; set; }
}