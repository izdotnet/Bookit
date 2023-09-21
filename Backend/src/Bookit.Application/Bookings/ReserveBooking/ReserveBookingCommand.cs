using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Bookings.ReserveBooking;

public record ReserveBookingCommand(
    Guid ApartmentId,
    Guid UserId,
    DateOnly StartDate,
    DateOnly EndDate
) : ICommand<Guid>;
