using System;
using Bookit.Domain.Apartments;
using Bookit.Domain.Bookings;
using Microsoft.EntityFrameworkCore;

namespace Bookit.Infrastructure.Repositories
{
    internal sealed class BookingRepository : Repository<Booking, BookingId>, IBookingRepository
    {
        public static readonly BookingStatus[] ActiveBookingStatuses =
        {
            BookingStatus.Reserved,
            BookingStatus.Confirmed,
            BookingStatus.Completed
        };

        public BookingRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        //not satisfied by the generic repository. Implements an optimistic check for overlapping bookings.
        public async Task<bool> IsOverlappingAsync(
            Apartment apartment,
            DateRange duration,
            CancellationToken cancellationToken = default
        )
        {
            return await DbContext
                .Set<Booking>()
                .AnyAsync(
                    booking =>
                        booking.ApartmentId == apartment.Id
                        && booking.Duration.Start <= duration.End
                        && booking.Duration.End >= duration.Start
                        && ActiveBookingStatuses.Contains(booking.Status),
                    cancellationToken
                );
        }
    }
}
