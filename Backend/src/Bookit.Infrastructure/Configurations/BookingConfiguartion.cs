using Bookit.Domain.Apartments;
using Bookit.Domain.Bookings;
using Bookit.Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bookit.Infrastructure.Configurations
{
    internal sealed class BookingConfiguartion : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.ToTable("bookings");

            builder.HasKey(booking => booking.Id);
            builder
                .Property(booking => booking.Id)
                .HasConversion(userId => userId.Value, value => new BookingId(value));

            builder.OwnsOne(
                booking => booking.PriceForPeriod,
                priceBuilder =>
                {
                    priceBuilder
                        .Property(money => money.Currency)
                        .HasConversion(currency => currency.Code, code => Currency.FromCode(code));
                }
            );

            builder.OwnsOne(
                booking => booking.CleaningFee,
                priceBuilder =>
                {
                    priceBuilder
                        .Property(money => money.Currency)
                        .HasConversion(currency => currency.Code, code => Currency.FromCode(code));
                }
            );

            builder.OwnsOne(
                booking => booking.TotalPrice,
                priceBuilder =>
                {
                    priceBuilder
                        .Property(money => money.Currency)
                        .HasConversion(currency => currency.Code, code => Currency.FromCode(code));
                }
            );
            builder.OwnsOne(booking => booking.Duration);

            builder.HasOne<Apartment>().WithMany().HasForeignKey(booking => booking.ApartmentId);

            builder.HasOne<User>().WithMany().HasForeignKey(booking => booking.UserId);
        }
    }
}
