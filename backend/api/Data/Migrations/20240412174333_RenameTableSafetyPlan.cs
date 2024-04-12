using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class RenameTableSafetyPlan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SafetyPlan_Patients_PatientId",
                table: "SafetyPlan");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SafetyPlan",
                table: "SafetyPlan");

            migrationBuilder.RenameTable(
                name: "SafetyPlan",
                newName: "SafetyPlans");

            migrationBuilder.RenameIndex(
                name: "IX_SafetyPlan_PatientId",
                table: "SafetyPlans",
                newName: "IX_SafetyPlans_PatientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SafetyPlans",
                table: "SafetyPlans",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SafetyPlans_Patients_PatientId",
                table: "SafetyPlans",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SafetyPlans_Patients_PatientId",
                table: "SafetyPlans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SafetyPlans",
                table: "SafetyPlans");

            migrationBuilder.RenameTable(
                name: "SafetyPlans",
                newName: "SafetyPlan");

            migrationBuilder.RenameIndex(
                name: "IX_SafetyPlans_PatientId",
                table: "SafetyPlan",
                newName: "IX_SafetyPlan_PatientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SafetyPlan",
                table: "SafetyPlan",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SafetyPlan_Patients_PatientId",
                table: "SafetyPlan",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
