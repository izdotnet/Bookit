using Bogus;
using Bookit.Application.Abstractions.Data;
using Bookit.Domain.Apartments;
using Dapper;

namespace Bookit.Api.Extensions;

public static class SeedDataExtensions
{
    public static void SeedData(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();

        var sqlConnectionFactory =
            scope.ServiceProvider.GetRequiredService<ISqlConnectionFactory>();
        using var connection = sqlConnectionFactory.CreateConnection();

        var faker = new Faker();

        List<object> apartments = new();
        for (var i = 0; i < 20; i++)
        {
            apartments.Add(
                new
                {
                    Id = Guid.NewGuid(),
                    Name = faker.Company.CompanyName(),
                    Description = "Amazing view",
                    Size = faker.Random.Number(20, 200),
                    NumberOfGuests = faker.Random.Number(1, 10),
                    Country = "Israel",
                    City = new List<string>
                    {
                        "Tel Aviv",
                        "Jerusalem",
                        "Haifa",
                        "BeerSheva",
                        "Ashkelon",
                        "Eilat",
                        "Ramla",
                        "Netanya",
                        "Rishon LeZion",
                        "Petah Tikva",
                        "Holon",
                        "Bat Yam",
                        "Bnei Brak",
                        "Ramat Gan",
                        "Ashdod",
                        "Rehovot",
                        "Herzliya",
                        "Kfar Saba",
                        "Modiin",
                    }[faker.Random.Int(0, 18)],
                    Street = faker.Address.StreetAddress(),
                    PostalCode = faker.Address.ZipCode(),
                    PhoneNumber = faker.Phone.PhoneNumber(),
                    PriceAmount = faker.Random.Number(200, 1500),
                    PriceCurrency = "₪",
                    CleaningFeeAmount = faker.Random.Number(30, 200),
                    CleaningFeeCurrency = "₪",
                    LastBookedOn = faker.Date.Past(1),
                }
            );
        }

        const string sql = """
            INSERT INTO apartments
            (
                id,
                name,
                description,
                size,
                number_of_guests,
                address_country,
                address_city,
                address_street,
                address_postal_code,
                address_phone_number,
                price_amount,
                price_currency,
                cleaning_fee_amount,
                cleaning_fee_currency,
                last_booked_on_utc
            )
            VALUES
            (
                @Id,
                @Name,
                @Description,
                @Size,
                @NumberOfGuests,
                @Country,
                @City,
                @Street,
                @PostalCode,
                @PhoneNumber,
                @PriceAmount,
                @PriceCurrency,
                @CleaningFeeAmount,
                @CleaningFeeCurrency,
                @LastBookedOn
            )
            """;

        connection.Execute(sql, apartments);
    }
}
