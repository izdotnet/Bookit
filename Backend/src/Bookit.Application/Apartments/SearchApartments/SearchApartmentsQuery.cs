using System;
using Bookit.Application.Abstractions.Messaging;

namespace Bookit.Application.Apartments.SearchApartments;

public sealed record SearchApartmentsQuery(
    DateOnly StartDate,
    DateOnly EndDate,
    string? City,
    int? Size,
    int? NumberOfGuests
) : IQuery<IReadOnlyList<ApartmentResponse>>;
