using Bookit.Application.Abstractions.Messaging;
using Bookit.Application.Apartments.SearchApartments;

namespace Bookit.Application.Apartments.GetApartment;
public sealed record GetApartmentsQuery(
    Guid ApartmentId
) : IQuery<ApartmentResponse>;
