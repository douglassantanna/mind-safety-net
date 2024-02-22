namespace api.Users.Services;
public interface IUserService
{
    Task<int> CreateUserAsync();
}
public class UserService : IUserService
{
    public Task<int> CreateUserAsync()
    {
        throw new NotImplementedException();
    }
}

