using Bookit.Domain.Bookings;
using Bookit.Domain.Bookings.Events;
using Bookit.Domain.Users;
using Bookit.Application.Abstractions.Email;
using MediatR;

namespace Bookit.Application.Bookings.ReserveBooking
{
    internal sealed class BookingReservedDomainEventHandler
        : INotificationHandler<BookingReservedDomainEvent>
    {
        private readonly IUserRepository _userRepository;
        private readonly IBookingRepository _bookingRepository;
        private readonly IEmailService _emailService;

        public BookingReservedDomainEventHandler(
            IUserRepository userRepository,
            IBookingRepository bookingRepository,
            IEmailService emailService
        )
        {
            _userRepository = userRepository;
            _bookingRepository = bookingRepository;
            _emailService = emailService;
        }

        public async Task Handle(
            BookingReservedDomainEvent notification,
            CancellationToken cancellationToken
        )
        {
            var booking = await _bookingRepository.GetByIdAsync(
                notification.BookingId,
                cancellationToken
            );
            if (booking is null)
                return;

            var user = await _userRepository.GetByIdAsync(booking.UserId, cancellationToken);
            if (user is null)
                return;

            await _emailService.SendAsync(
                user.Email,
                "Booking Reserved",
                "You have a 10 minute window to confirm this booking"
            );
        }
    }
}
