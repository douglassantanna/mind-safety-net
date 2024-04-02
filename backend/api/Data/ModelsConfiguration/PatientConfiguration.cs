using api.Patients.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Data.ModelsConfiguration;
public class PatientConfiguration : IEntityTypeConfiguration<Patient>
{
    public void Configure(EntityTypeBuilder<Patient> builder)
    {
        builder.Property(x => x.Id).HasColumnType("INTEGER").ValueGeneratedOnAdd();
        builder.Property(x => x.Email).HasColumnType("varchar").HasMaxLength(255);
        builder.Property(x => x.FullName).HasColumnType("varchar").HasMaxLength(255);
        builder.Property(x => x.PhoneNumber).HasColumnType("varchar").HasMaxLength(255);
    }
}

