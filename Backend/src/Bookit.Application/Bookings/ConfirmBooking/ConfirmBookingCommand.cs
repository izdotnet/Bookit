using Bookit.Application.Abstractions.Messaging;
using Bookit.Domain.Bookings;

namespace Bookit.Application.Bookings.ConfirmBooking;

public sealed record ConfirmBookingCommand(Guid BookingId) : ICommand;
