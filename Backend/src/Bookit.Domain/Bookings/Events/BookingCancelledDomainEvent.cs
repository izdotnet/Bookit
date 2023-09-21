using Bookit.Domain.Abstractions;

namespace Bookit.Domain.Bookings.Events
{
    public sealed record BookingCancelledDomainEvent(BookingId BookingId) : IDomainEvent { }
}
