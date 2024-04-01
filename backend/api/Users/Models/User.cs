using System.Text.Json.Serialization;
using api.Shared;

namespace api.Users.Models;
public class User : Entity
{
    public User()
    {
    }

    public void EditUser(string fullName, string email, Role role, bool active)
    {
        FullName = fullName;
        Email = email;
        Role = role;
        Active = active;
    }

    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    [JsonIgnore]
    public string Password { get; set; } = string.Empty;
    public Role Role { get; set; }
    public bool Active { get; set; } = true;
}
