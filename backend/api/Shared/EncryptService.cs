namespace api.Shared;
using BC = BCrypt.Net.BCrypt;

public interface IEncryptService
{
    string HashPassword(string password);
}
public class EncryptService : IEncryptService
{
    public string HashPassword(string password) => BC.HashPassword(password);
}
