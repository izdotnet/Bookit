using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Bookings.GetBookingsForUser;

public sealed record GetBookingsForUserQuery(Guid UserId) : IQuery<List<BookingUserResponse>> { }
