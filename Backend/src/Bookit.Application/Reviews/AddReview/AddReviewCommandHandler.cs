using Bookit.Application.Abstractions.Clock;
using Bookit.Application.Abstractions.Messaging;
using Bookit.Domain.Abstractions;
using Bookit.Domain.Bookings;
using Bookit.Domain.Reviews;

namespace Bookit.Application.Reviews.AddReview;

internal sealed class AddReviewCommandHandler : ICommandHandler<AddReviewCommand>
{
    private readonly IBookingRepository _bookingRepository;
    private readonly IReviewRepository _reviewRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IDateTimeProvider _dateTimeProvider;

    public AddReviewCommandHandler(
        IBookingRepository bookingRepository,
        IReviewRepository reviewRepository,
        IUnitOfWork unitOfWork,
        IDateTimeProvider dateTimeProvider
    )
    {
        _bookingRepository = bookingRepository;
        _reviewRepository = reviewRepository;
        _unitOfWork = unitOfWork;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<Result> Handle(AddReviewCommand request, CancellationToken cancellationToken)
    {
        var booking = await _bookingRepository.GetByIdAsync(
            new BookingId(request.BookingId),
            cancellationToken
        );

        if (booking is null)
        {
            return Result.Failure(BookingErrors.NotFound);
        }

        var ratingResult = Rating.Create(request.Rating);

        if (ratingResult.IsFailure)
        {
            return Result.Failure(ratingResult.Error);
        }

        var reviewResult = Review.Create(
            booking,
            ratingResult.Value,
            new Comment(request.Comment),
            _dateTimeProvider.UtcNow
        );

        if (reviewResult.IsFailure)
        {
            return Result.Failure(reviewResult.Error);
        }

        _reviewRepository.Add(reviewResult.Value);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
