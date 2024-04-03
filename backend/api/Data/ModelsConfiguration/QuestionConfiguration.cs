using api.Questions.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Data.ModelsConfiguration;
public class QuestionConfiguration : IEntityTypeConfiguration<Question>
{
    public void Configure(EntityTypeBuilder<Question> builder)
    {
        builder.Property(x => x.Id).HasColumnType("INTEGER").ValueGeneratedOnAdd();
        builder.Property(x => x.Description).HasColumnType("varchar").HasMaxLength(500);
    }
}

