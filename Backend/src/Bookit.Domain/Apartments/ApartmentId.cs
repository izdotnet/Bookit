namespace Bookit.Domain.Apartments;

public record ApartmentId(Guid Value)
{
    public static ApartmentId New() => new(Guid.NewGuid());
}
