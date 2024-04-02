using api.Shared;

namespace api.Patients.Models;
public class Patient : Entity
{
  public string FullName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string PhoneNumber { get; set; } = string.Empty;
  private readonly List<Question> _questions = [];
  public IReadOnlyCollection<Question> Questions => _questions.AsReadOnly();
  public DateTime DateSubmittedForm { get; set; }
  public Priority Priority { get; set; }
}
