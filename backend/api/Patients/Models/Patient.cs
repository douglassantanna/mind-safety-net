using api.Shared;

namespace api.Patients.Models;
public class Patient : Entity
{
  public string FullName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string ContactNumber { get; set; } = string.Empty;
  public Gender Gender { get; set; }
  public DateTime Birthdate { get; set; }
}
