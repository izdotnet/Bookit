namespace Bookit.Application.Bookings.GetBookingsForUser;

public sealed class BookingUserResponse
{
    public Guid Id { get; init; }
    public Guid ApartmentId { get; init; }
    public string ApartmentName { get; init; }
    public Guid UserId { get; init; }
    public DateTime DurationStart { get; init; }
    public DateTime DurationEnd { get; init; }
    public string Status { get; init; }
    public DateTime CreatedOnUtc { get; init; }
    public string PriceCurrency { get; init; }
    public decimal CleaningFeeAmount { get; init; }
    public string CleaningFeeCurrency { get; init; }
    public decimal TotalPriceAmount { get; init; }
    public string TotalPriceCurrency { get; init; }
    public string UserName { get; init; }
    public string UserEmail { get; init; }
}
