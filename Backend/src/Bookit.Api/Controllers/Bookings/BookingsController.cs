using Bookit.Application.Bookings.CancelBooking;
using Bookit.Application.Bookings.CompleteBooking;
using Bookit.Application.Bookings.ConfirmBooking;
using Bookit.Application.Bookings.GetBooking;
using Bookit.Application.Bookings.GetBookingsForUser;
using Bookit.Application.Bookings.RejectBooking;
using Bookit.Application.Bookings.ReserveBooking;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Bookit.Api.Controllers.Bookings;

[ApiController]
[Route("api/bookings")]
public class BookingsController : ControllerBase
{
    private readonly ISender _sender;

    public BookingsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBooking(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetBookingQuery(id);
        var result = await _sender.Send(query, cancellationToken);

        return result.IsSuccess ? Ok(result.Value) : NotFound();
    }

    [HttpGet]
    [Route("user/{userId}")]
    public async Task<IActionResult> GetBookingsForUser(
        Guid userId,
        CancellationToken cancellationToken
    )
    {
        var query = new GetBookingsForUserQuery(userId);
        var result = await _sender.Send(query, cancellationToken);

        return result.IsSuccess ? Ok(result.Value) : NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> ReserveBooking(
        ReserveBookingRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new ReserveBookingCommand(
            request.ApartmentId,
            request.UserId,
            request.StartDate,
            request.EndDate
        );
        var result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return CreatedAtAction(nameof(GetBooking), new { id = result.Value }, result.Value);
    }

    [HttpPost]
    [Route("{id}/cancel")]
    public async Task<IActionResult> CancelBooking(Guid id, CancellationToken cancellationToken)
    {
        var command = new CancelBookingCommand(id);
        var result = await _sender.Send(command, cancellationToken);

        return result.IsSuccess ? NoContent() : NotFound();
    }

    [HttpPost]
    [Route("{id}/confirm")]
    public async Task<IActionResult> ConfirmBooking(Guid id, CancellationToken cancellationToken)
    {
        var command = new ConfirmBookingCommand(id);
        var result = await _sender.Send(command, cancellationToken);

        return result.IsSuccess ? NoContent() : NotFound();
    }

    [HttpPost]
    [Route("{id}/reject")]
    public async Task<IActionResult> RejectBooking(Guid id, CancellationToken cancellationToken)
    {
        var command = new RejectBookingCommand(id);
        var result = await _sender.Send(command, cancellationToken);

        return result.IsSuccess ? NoContent() : NotFound();
    }

    [HttpPost]
    [Route("{id}/complete")]
    public async Task<IActionResult> CompleteBooking(Guid id, CancellationToken cancellationToken)
    {
        var command = new CompleteBookingCommand(id);
        var result = await _sender.Send(command, cancellationToken);

        return result.IsSuccess ? NoContent() : NotFound();
    }
}
