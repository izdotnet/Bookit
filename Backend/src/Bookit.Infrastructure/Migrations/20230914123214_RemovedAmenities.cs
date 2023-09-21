using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bookit.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovedAmenities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "amenities_up_charge_amount",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "amenities_up_charge_currency",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "amenities",
                table: "apartments");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "amenities_up_charge_amount",
                table: "bookings",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "amenities_up_charge_currency",
                table: "bookings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "amenities",
                table: "apartments",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
