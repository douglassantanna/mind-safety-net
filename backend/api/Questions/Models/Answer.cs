using api.Shared;

namespace api.Questions.Models;

public class Answer : Entity
{
  public string Description { get; set; } = string.Empty;
  public int Value { get; set; }
}