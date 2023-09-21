using FluentValidation;

namespace Bookit.Application.Bookings.ReserveBooking;

public class ReserveBookingCommandValidator : AbstractValidator<ReserveBookingCommand>
{
    public ReserveBookingCommandValidator()
    {
        RuleFor(c => c.UserId).NotEmpty().WithMessage("User ID is required").NotEqual(Guid.Empty);
        RuleFor(c => c.ApartmentId)
            .NotEmpty()
            .WithMessage("Apartment ID is required")
            .NotEqual(Guid.Empty);
        RuleFor(c => c.StartDate).LessThan(c => c.EndDate);
    }
}
