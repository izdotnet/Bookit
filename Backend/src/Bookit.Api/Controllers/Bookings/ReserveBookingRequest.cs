using Bookit.Domain.Apartments;
using Bookit.Domain.Users;

namespace Bookit.Api.Controllers.Bookings;

public sealed record ReserveBookingRequest(
    Guid ApartmentId,
    Guid UserId,
    DateOnly StartDate,
    DateOnly EndDate
);
