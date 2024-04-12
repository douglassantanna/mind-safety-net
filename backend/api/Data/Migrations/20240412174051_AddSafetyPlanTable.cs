using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddSafetyPlanTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SafetyPlan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    WarningSigns = table.Column<string>(type: "TEXT", nullable: false),
                    Distractions = table.Column<string>(type: "TEXT", nullable: false),
                    ReasonsForLiving = table.Column<string>(type: "TEXT", nullable: false),
                    SituationFever = table.Column<string>(type: "TEXT", nullable: false),
                    ProfessionalSupport = table.Column<string>(type: "TEXT", nullable: false),
                    PatientId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SafetyPlan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SafetyPlan_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SafetyPlan_PatientId",
                table: "SafetyPlan",
                column: "PatientId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SafetyPlan");
        }
    }
}
