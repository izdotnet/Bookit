using Bookit.Domain.Apartments;

namespace Bookit.Domain.Bookings
{
    public class PricingService
    {
        public PricingDetails CalculatePrice(Apartment apartment, DateRange period)
        {
            var currency = apartment.Price.Currency;
            var priceForPeriod = new Money(apartment.Price.Amount * period.LengthInDays, currency);
            var totalPrice = Money.Zero(currency);

            if (apartment.Price.Currency != apartment.CleaningFee.Currency)
                throw new InvalidOperationException(
                    $"Mismatched currencies: Price in {apartment.Price.Currency} but Cleaning Fee in {apartment.CleaningFee.Currency}."
                );

            totalPrice += priceForPeriod;

            if (!apartment.CleaningFee.IsZero())
                totalPrice += apartment.CleaningFee;

            return new PricingDetails(priceForPeriod, apartment.CleaningFee, totalPrice);
        }
    }
}
