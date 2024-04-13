using api.Patients.Dtos;
using api.Questions.Models;
using api.Shared;

namespace api.Patients.Models;
public class Patient : Entity
{
  public Patient(
      string fullName,
      string email,
      string phoneNumber,
      IEnumerable<Question> questions,
      List<SelectedAnswerId> selectedAnswerIds)
  {
    FullName = fullName;
    Email = email;
    PhoneNumber = phoneNumber;
    SelectedAnswerIds = selectedAnswerIds;
    DateSubmittedForm = DateTime.Now;
    _questions.AddRange(questions);
    SetPriority(_questions);
    SafetyPlan.PatientEmail = email;
  }
  protected Patient()
  { }
  public string FullName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string PhoneNumber { get; set; } = string.Empty;
  public List<SelectedAnswerId> SelectedAnswerIds { get; set; } = [];
  private readonly List<Question> _questions = [];
  public IReadOnlyCollection<Question> Questions => _questions.AsReadOnly();
  public DateTime DateSubmittedForm { get; private set; }
  public Priority Priority { get; private set; }
  public SafetyPlan SafetyPlan { get; set; } = new();
  public DateTime Appointment { get; set; }
  public bool IsScheduled { get; set; }
  private void SetPriority(IEnumerable<Question> _questionsToSum)
  {

    var selectedAnswers = _questionsToSum
                          .SelectMany(q => q.Answers)
                          .Where(a => SelectedAnswerIds.Select(x => x.AnswerId).Contains(a.Id));

    int sum = selectedAnswers.Sum(x => x.Value);

    Priority = sum switch
    {
      0 => Priority.Undefined,
      int n when n < 25 => Priority.Low,
      int n when n < 50 => Priority.Medium,
      _ => Priority.High
    };
  }
  internal void ScheduleAppointment(ScheduleAppointmentRequest request)
  {
    try
    {
      if (ValidateDateAndTime(request))
      {
        throw new ArgumentException("Invalid date or time parameters.");
      }

      var date = new DateOnly(request.ChoosenYear, request.ChoosenMonth, request.ChoosenDay);
      var time = new TimeOnly(request.ChoosenHour, request.ChoosenMinute);
      Appointment = new DateTime(date, time);
      IsScheduled = true;
    }
    catch (Exception ex)
    {
      Console.WriteLine($"Error scheduling appointment: {ex.Message}");
      throw;
    }
  }
  private static bool ValidateDateAndTime(ScheduleAppointmentRequest request)
  {
    return request.ChoosenYear < 1 || request.ChoosenMonth < 1 || request.ChoosenMonth > 12 || request.ChoosenDay < 1 || request.ChoosenDay > DateTime.DaysInMonth(request.ChoosenYear, request.ChoosenMonth) ||
               request.ChoosenHour < 0 || request.ChoosenHour > 23 || request.ChoosenMinute < 0 || request.ChoosenMinute > 59;
  }
}
public class SelectedAnswerId : Entity
{
  public int AnswerId { get; set; }
}