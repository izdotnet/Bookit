using Bookit.Domain.Abstractions;

namespace Bookit.Domain.Bookings.Events
{
    public sealed record BookingReservedDomainEvent(BookingId BookingId) : IDomainEvent { }
}
