using Bookit.Domain.Abstractions;

namespace Bookit.Domain.Bookings.Events
{
    public sealed record BookingConfirmedDomainEvent(BookingId BookingId) : IDomainEvent { }
}
