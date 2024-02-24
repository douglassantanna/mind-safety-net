namespace api.Shared;
using BC = BCrypt.Net.BCrypt;

public interface IEncryptService
{
    string HashPassword(string password);
    bool IsPasswordValid(string hasedPassword, string password);
}
public class EncryptService : IEncryptService
{
    public string HashPassword(string password) => BC.HashPassword(password);
    public bool IsPasswordValid(string hasedPassword, string password) => BC.Verify(password, hasedPassword);
}
