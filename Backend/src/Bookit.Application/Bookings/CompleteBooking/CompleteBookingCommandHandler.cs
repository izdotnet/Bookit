using Bookit.Application.Abstractions.Clock;
using Bookit.Application.Abstractions.Messaging;
using Bookit.Domain.Abstractions;
using Bookit.Domain.Bookings;

namespace Bookit.Application.Bookings.CompleteBooking;

internal sealed class CompleteBookingCommandHandler : ICommandHandler<CompleteBookingCommand>
{
    private readonly IDateTimeProvider _dateTimeProvider;
    private readonly IBookingRepository _bookingRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CompleteBookingCommandHandler(
        IDateTimeProvider dateTimeProvider,
        IBookingRepository bookingRepository,
        IUnitOfWork unitOfWork
    )
    {
        _dateTimeProvider = dateTimeProvider;
        _bookingRepository = bookingRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(
        CompleteBookingCommand request,
        CancellationToken cancellationToken
    )
    {
        var booking = await _bookingRepository.GetByIdAsync(
            new BookingId(request.BookingId),
            cancellationToken
        );

        if (booking is null)
        {
            return Result.Failure(BookingErrors.NotFound);
        }

        var result = booking.Complete(_dateTimeProvider.UtcNow);

        if (result.IsFailure)
        {
            return result;
        }

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
