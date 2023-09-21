using Bookit.Domain.Abstractions;

namespace Bookit.Domain.Bookings.Events
{
    public sealed record BookingCompletedDomainEvent(BookingId BookingId) : IDomainEvent { }
}
