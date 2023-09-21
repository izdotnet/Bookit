using Bookit.Application.Abstractions.Messaging;
using Bookit.Domain.Abstractions;
using Bookit.Domain.Apartments;
using Bookit.Domain.Users;
using Bookit.Domain.Bookings;
using Bookit.Application.Abstractions.Clock;
using Bookit.Application.Exceptions;

namespace Bookit.Application.Bookings.ReserveBooking;

internal sealed class ReserveBookingCommandHandler : ICommandHandler<ReserveBookingCommand, Guid>
{
    private readonly IUserRepository _userRepository;
    private readonly IApartmentRepository _apartmentRepository;
    private readonly IBookingRepository _bookingRepositroy;
    private readonly IUnitOfWork _unitOfWork;
    private readonly PricingService _pricingService;
    private readonly IDateTimeProvider _dateTimeProvider;

    public ReserveBookingCommandHandler(
        IUserRepository userRepository,
        IApartmentRepository apartmentRepository,
        IBookingRepository bookingRepositroy,
        IUnitOfWork unitOfWork,
        PricingService pricingService,
        IDateTimeProvider dateTimeProvider
    )
    {
        _userRepository = userRepository;
        _apartmentRepository = apartmentRepository;
        _bookingRepositroy = bookingRepositroy;
        _unitOfWork = unitOfWork;
        _pricingService = pricingService;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<Result<Guid>> Handle(
        ReserveBookingCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _userRepository.GetByIdAsync(
            new UserId(request.UserId),
            cancellationToken
        );

        if (user is null)
            return Result.Failure<Guid>(UserErrors.NotFound);

        var apartment = await _apartmentRepository.GetByIdAsync(
            new ApartmentId(request.ApartmentId),
            cancellationToken
        );

        if (apartment is null)
            return Result.Failure<Guid>(ApartmentErrors.NotFound);

        var duration = DateRange.Create(request.StartDate, request.EndDate);

        if (await _bookingRepositroy.IsOverlappingAsync(apartment, duration, cancellationToken))
            return Result.Failure<Guid>(BookingErrors.Overlap);

        try
        {
            var booking = Booking.Reserve(
                apartment,
                user.Id,
                duration,
                _dateTimeProvider.UtcNow,
                _pricingService
            );

            _bookingRepositroy.Add(booking);

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return booking.Id.Value;
        }
        catch (ConcurrencyException)
        {
            //solve race condition with optimistic concurrency
            return Result.Failure<Guid>(BookingErrors.Overlap);
        }
    }
}
