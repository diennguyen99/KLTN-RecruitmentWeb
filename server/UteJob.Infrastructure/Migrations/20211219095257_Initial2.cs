using Microsoft.EntityFrameworkCore.Migrations;

namespace UteJob.Infrastructure.Migrations
{
    public partial class Initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppliedJobs_CVs_CVId",
                table: "AppliedJobs");

            migrationBuilder.AlterColumn<int>(
                name: "CVId",
                table: "AppliedJobs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_AppliedJobs_CVs_CVId",
                table: "AppliedJobs",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppliedJobs_CVs_CVId",
                table: "AppliedJobs");

            migrationBuilder.AlterColumn<int>(
                name: "CVId",
                table: "AppliedJobs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppliedJobs_CVs_CVId",
                table: "AppliedJobs",
                column: "CVId",
                principalTable: "CVs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
