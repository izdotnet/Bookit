using Bookit.Application.Abstractions.Messaging;
using Bookit.Domain.Bookings;

namespace Bookit.Application.Bookings.CompleteBooking;

public record CompleteBookingCommand(Guid BookingId) : ICommand;
