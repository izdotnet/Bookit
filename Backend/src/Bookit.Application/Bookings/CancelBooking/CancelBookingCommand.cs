using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Bookings.CancelBooking;

public record CancelBookingCommand(Guid BookingId) : ICommand;
