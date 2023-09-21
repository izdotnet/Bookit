using Bookit.Domain.Abstractions;

namespace Bookit.Domain.Bookings.Events
{
    public sealed record BookingRejectedDomainEvent(BookingId BookingId) : IDomainEvent { }
}
