using api.Questions.Models;
using api.Shared;

namespace api.Patients.Models;
public class Patient : Entity
{
  public Patient(
      string fullName,
      string email,
      string phoneNumber,
      IEnumerable<Question> questions)
  {
    FullName = fullName;
    Email = email;
    PhoneNumber = phoneNumber;
    _questions.AddRange(questions);
    SetPriority(_questions);
  }
  private void SetPriority(IEnumerable<Question> _questionsToSum)
  {
    int sum = _questionsToSum.Sum(q => q.Answers.Sum(a => a.Value));

    Priority = sum switch
    {
      0 => Priority.Undefined,
      int n when n < 25 => Priority.Low,
      int n when n < 50 => Priority.Medium,
      _ => Priority.High
    };
  }
  public string FullName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string PhoneNumber { get; set; } = string.Empty;
  private readonly List<Question> _questions = [];
  public IReadOnlyCollection<Question> Questions => _questions.AsReadOnly();
  public DateTime DateSubmittedForm { get; private set; }
  public Priority Priority { get; private set; }
}
