namespace Bookit.Domain.Apartments
{
    public record Address(
        string Country,
        string City,
        string Street,
        string PostalCode,
        string PhoneNumber
    );
}
