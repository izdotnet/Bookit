using Bookit.Domain.Apartments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bookit.Infrastructure.Configurations;

internal sealed class ApartmentConfiguration : IEntityTypeConfiguration<Apartment>
{
    private static Amenity ConvertToAmenity(string value)
    {
        value = value.Replace(" ", "");
        return Enum.Parse<Amenity>(value);
    }

    public void Configure(EntityTypeBuilder<Apartment> builder)
    {
        builder.ToTable("apartments");

        builder.HasKey(apartment => apartment.Id);

        builder
            .Property(apartment => apartment.Id)
            .HasConversion(apartmentId => apartmentId.Value, value => new ApartmentId(value));

        builder.OwnsOne(apartment => apartment.Address);

        builder
            .Property(apartment => apartment.Name)
            .HasMaxLength(200)
            .HasConversion(name => name.Value, value => new Name(value));

        builder
            .Property(apartment => apartment.Size)
            .HasConversion(size => size.Value, value => new Size(value));

        builder
            .Property(apartment => apartment.NumberOfGuests)
            .HasConversion(
                numberOfGuests => numberOfGuests.Value,
                value => new NumberOfGuests(value)
            );

        builder
            .Property(apartment => apartment.Description)
            .HasMaxLength(2000)
            .HasConversion(description => description.Value, value => new Description(value));

        builder.OwnsOne(
            apartment => apartment.Price,
            priceBuilder =>
            {
                priceBuilder
                    .Property(money => money.Currency)
                    .HasConversion(currency => currency.Code, code => Currency.FromCode(code));
            }
        );

        builder.OwnsOne(
            apartment => apartment.CleaningFee,
            priceBuilder =>
            {
                priceBuilder
                    .Property(money => money.Currency)
                    .HasConversion(currency => currency.Code, code => Currency.FromCode(code));
            }
        );

        //row versioning for implementing optimistic concurrency
        builder.Property<uint>("Version").IsRowVersion();
    }
}
