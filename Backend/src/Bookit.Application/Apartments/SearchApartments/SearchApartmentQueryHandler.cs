using Bookit.Application.Abstractions.Data;
using Bookit.Application.Abstractions.Messaging;
using Bookit.Domain.Abstractions;
using Bookit.Domain.Bookings;
using Dapper;

namespace Bookit.Application.Apartments.SearchApartments;

internal sealed class SearchApartmentQueryHandler
    : IQueryHandler<SearchApartmentsQuery, IReadOnlyList<ApartmentResponse>>
{
    private static readonly int[] ActiveBookingStatuses =
    {
        (int)BookingStatus.Reserved,
        (int)BookingStatus.Confirmed,
        (int)BookingStatus.Completed
    };

    private readonly ISqlConnectionFactory _sqlConnectionFactory;

    public SearchApartmentQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
    {
        _sqlConnectionFactory = sqlConnectionFactory;
    }

    public async Task<Result<IReadOnlyList<ApartmentResponse>>> Handle(
        SearchApartmentsQuery request,
        CancellationToken cancellationToken
    )
    {
        if (request.StartDate > request.EndDate)
            return new List<ApartmentResponse>();

        using var connection = _sqlConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                a.id AS Id,
                a.name AS Name,
                a.description AS Description,
                a.size AS Size,
                a.number_of_guests AS NumberOfGuests,
                a.price_amount AS Price,
                a.price_currency AS Currency,
                a.address_country AS Country,
                a.address_city AS City,
                a.address_street AS Street,
                a.address_postal_code AS PostalCode,
                a.address_phone_number AS PhoneNumber
            FROM apartments AS a
            WHERE NOT EXISTS
            (
                SELECT 1 FROM bookings as b
                WHERE
                b.apartment_id = a.id AND
                b.duration_start <= @EndDate AND
                b.duration_end >= @StartDate AND
                b.status = ANY(@ActiveBookingStatuses)
            )
            AND a.address_city = @City;
            """;

        var apartments = await connection.QueryAsync<
            ApartmentResponse,
            AddressResponse,
            ApartmentResponse
        >(
            sql,
            (apartment, address) =>
            {
                apartment.Address = address;
                return apartment;
            },
            new { request.StartDate, request.EndDate, ActiveBookingStatuses, City = request.City },
            splitOn: "Country"
        );

        return apartments.ToList();
    }
}
