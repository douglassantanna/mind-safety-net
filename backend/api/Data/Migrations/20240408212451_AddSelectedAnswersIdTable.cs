using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddSelectedAnswersIdTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SelectedAnswerIds",
                table: "Patients");

            migrationBuilder.CreateTable(
                name: "SelectedAnswerIds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AnswerId = table.Column<int>(type: "INTEGER", nullable: false),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelectedAnswerIds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SelectedAnswerIds_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SelectedAnswerIds_PatientId",
                table: "SelectedAnswerIds",
                column: "PatientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SelectedAnswerIds");

            migrationBuilder.AddColumn<string>(
                name: "SelectedAnswerIds",
                table: "Patients",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
