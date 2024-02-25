using api.Users.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;
public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }
}
