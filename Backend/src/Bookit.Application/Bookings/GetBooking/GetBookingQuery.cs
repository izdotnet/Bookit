using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Bookings.GetBooking;

public sealed record GetBookingQuery(Guid BookingId) : IQuery<BookingResponse> { }
