using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Bookings.RejectBooking;

public sealed record RejectBookingCommand(Guid BookingId) : ICommand;
