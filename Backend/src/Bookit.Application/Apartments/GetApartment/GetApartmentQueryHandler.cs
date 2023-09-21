using Bookit.Application.Abstractions.Data;
using Bookit.Application.Abstractions.Messaging;
using Bookit.Application.Apartments.SearchApartments;
using Bookit.Domain.Abstractions;
using Dapper;

namespace Bookit.Application.Apartments.GetApartment;

internal sealed class GetApartmentQueryHandler : IQueryHandler<GetApartmentsQuery, ApartmentResponse>
{
    private readonly ISqlConnectionFactory _sqlConnectionFactory;

    public GetApartmentQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
    {
        _sqlConnectionFactory = sqlConnectionFactory;
    }

    public async Task<Result<ApartmentResponse>> Handle(
        GetApartmentsQuery request,
        CancellationToken cancellationToken
    )
    {

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
            WHERE a.id = @ApartmentId
            """;

        var apartment = await connection.QueryAsync<
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
            new { request.ApartmentId },
            splitOn: "Country"
        );

        return apartment.FirstOrDefault();
    }
}
