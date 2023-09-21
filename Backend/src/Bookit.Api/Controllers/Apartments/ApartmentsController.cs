using Bookit.Application.Apartments.GetApartment;
using Bookit.Application.Apartments.SearchApartments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookit.Api.Controllers.Apartments
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/apartments")]
    public class ApartmentsController : ControllerBase
    {
        private readonly ISender _sender;

        public ApartmentsController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet]
        public async Task<IActionResult> SearchApartments(
            DateOnly startDate,
            DateOnly endDate,
            string? city,
            int? size,
            int? numberOfGuests,
            CancellationToken cancellationToken
        )
        {
            var query = new SearchApartmentsQuery(startDate, endDate, city, size, numberOfGuests);
            var result = await _sender.Send(query, cancellationToken);

            return Ok(result.Value);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetApartment(Guid id, CancellationToken cancellationToken)
        {
            var query = new GetApartmentsQuery(id);
            var result = await _sender.Send(query, cancellationToken);

            return Ok(result.Value);
        }
    }
}
