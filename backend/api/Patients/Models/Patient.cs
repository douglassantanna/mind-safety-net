using api.Shared;

namespace api.Patients.Models;
public class Patient : Entity
{
  public Patient(string fullName, string email, string phoneNumber, List<Question> questions)
  {
    FullName = fullName;
    Email = email;
    PhoneNumber = phoneNumber;
    AddQuestions(questions);
  }

  private void AddQuestions(List<Question> questions)
  {
    var questionsToAdd = questions.SelectMany(q => new Question());
  }

  private void SetPriority()
  {

  }

  public string FullName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string PhoneNumber { get; set; } = string.Empty;
  private readonly List<Question> _questions = [];
  public IReadOnlyCollection<Question> Questions => _questions.AsReadOnly();
  public DateTime DateSubmittedForm { get; private set; }
  public Priority Priority { get; private set; }

}
