namespace Bookit.Application.Apartments.SearchApartments
{
    public sealed class AddressResponse
    {
        public string Country { get; init; }
        public string City { get; init; }
        public string Street { get; init; }
        public string PostalCode { get; init; }
        public string PhoneNumber { get; init; }
    }
}
