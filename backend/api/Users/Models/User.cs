using System.Text.Json.Serialization;
using api.Shared;

namespace api.Users.Models;
public class User : Entity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    [JsonIgnore]
    public string Password { get; set; } = string.Empty;
    public Role Role { get; set; }
}
