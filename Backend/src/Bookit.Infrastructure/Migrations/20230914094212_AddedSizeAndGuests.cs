using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bookit.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedSizeAndGuests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "number_of_guests",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "size",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "number_of_guests",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "size",
                table: "apartments");
        }
    }
}
