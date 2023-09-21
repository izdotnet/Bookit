using Bookit.Domain.Abstractions;

namespace Bookit.Domain.Apartments
{
    public static class ApartmentErrors
    {
        public static Error NotFound =
            new("Apartment.NotFound", "The apartment with the specified Id was not found.");
    }
}
