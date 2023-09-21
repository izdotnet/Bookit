using Bookit.Application.Abstractions.Data;
using Bookit.Application.Abstractions.Messaging;
using Bookit.Domain.Abstractions;
using Dapper;

namespace Bookit.Application.Bookings.GetBookingsForUser;

internal sealed class GetBookingsForUserQueryHandler
    : IQueryHandler<GetBookingsForUserQuery, List<BookingUserResponse>>
{
    private readonly ISqlConnectionFactory _sqlConnectionFactory;

    public GetBookingsForUserQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
    {
        _sqlConnectionFactory = sqlConnectionFactory;
    }

    public async Task<Result<List<BookingUserResponse>>> Handle(
        GetBookingsForUserQuery request,
        CancellationToken cancellationToken
    )
    {
        using var connection = _sqlConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                b.id AS Id,
                b.apartment_id AS ApartmentId,
                a.name AS ApartmentName,
                b.user_id AS UserId,
                b.duration_start AS DurationStart,
                b.duration_end AS DurationEnd,
                b.status,
                b.created_on_utc,
                b.price_for_period_currency AS PriceCurrency,
                b.cleaning_fee_amount AS CleaningFeeAmount,
                b.cleaning_fee_currency AS CleaningFeeCurrency,
                b.total_price_amount AS TotalPriceAmount,
                b.total_price_currency AS TotalPriceCurrency,
                u.first_name || ' ' || u.last_name AS UserName,
                u.email AS UserEmail
            FROM bookings b
            INNER JOIN apartments a ON b.apartment_id = a.id
            INNER JOIN users u ON b.user_id = u.id
            WHERE b.user_id = @UserId
            ORDER BY b.created_on_utc DESC
            """;

        var bookings = await connection.QueryAsync<BookingUserResponse>(
            sql,
            new { request.UserId }
        );
        return bookings.ToList();
    }
}
