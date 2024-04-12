using api.Patients.Models;
using api.Questions.Models;
using api.Users.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;
public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<SelectedAnswerId> SelectedAnswerIds => Set<SelectedAnswerId>();
    public DbSet<SafetyPlan> SafetyPlans => Set<SafetyPlan>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
    }
}
