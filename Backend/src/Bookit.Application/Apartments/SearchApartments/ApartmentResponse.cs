using Bookit.Domain.Apartments;

namespace Bookit.Application.Apartments.SearchApartments
{
    public sealed class ApartmentResponse
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public int Size { get; init; }
        public int NumberOfGuests { get; init; }
        public string Description { get; init; }
        public decimal Price { get; init; }
        public string Currency { get; init; }
        public decimal CleaningFee { get; init; }
        public AddressResponse Address { get; set; }
    }
}
