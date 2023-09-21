using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Reviews.AddReview;

public sealed record AddReviewCommand(Guid BookingId, int Rating, string Comment) : ICommand;
