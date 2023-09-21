using Bookit.Domain.Abstractions;

namespace Bookit.Domain.Apartments
{
    public sealed class Apartment : Entity<ApartmentId>
    {
        public Apartment(
            ApartmentId id,
            Name name,
            Description description,
            Size size,
            NumberOfGuests numberOfGuests,
            Address address,
            Money price,
            Money cleaningFee
        ) : base(id)
        {
            Name = name;
            Description = description;
            Size = size;
            NumberOfGuests = numberOfGuests;
            Address = address;
            Price = price;
            CleaningFee = cleaningFee;
        }

        private Apartment() { }

        public Name Name { get; private set; }
        public Description Description { get; private set; }
        public Size Size { get; private set; }
        public NumberOfGuests NumberOfGuests { get; private set; }
        public Address Address { get; private set; }
        public Money Price { get; private set; }
        public Money CleaningFee { get; private set; }
        public DateTime? LastBookedOnUtc { get; internal set; }
    }
}
