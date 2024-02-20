using api.Patients.Models;
using api.Shared;

namespace api.SuicideForms.Models;
public class BaseForm : Entity
{
    public bool IsDefault { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    private readonly List<Question> _questions = [];
    public IReadOnlyCollection<Question> Questions => _questions.AsReadOnly();

}
