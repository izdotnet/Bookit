using Bookit.Domain.Apartments;

namespace Bookit.Domain.Bookings
{
    public record PricingDetails(Money PriceForPeriod, Money CleaningFee, Money TotalPrice);
}
