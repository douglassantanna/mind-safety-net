using api.Users.Models;

namespace api.Users.Dtos;
public record ViewUserDTO(int Id, string FullName, string Email, Role Role, bool Active);