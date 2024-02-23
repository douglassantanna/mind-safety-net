using api.Users.Models;

namespace api.Users.Dtos;
public record ViewUserDTO(string FullName, string Email, Role Role);