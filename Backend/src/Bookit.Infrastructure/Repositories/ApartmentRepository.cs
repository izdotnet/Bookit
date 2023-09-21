using System;
using Bookit.Domain.Apartments;

namespace Bookit.Infrastructure.Repositories
{
    internal sealed class ApartmentRepositroy
        : Repository<Apartment, ApartmentId>,
            IApartmentRepository
    {
        public ApartmentRepositroy(ApplicationDbContext dbContext) : base(dbContext) { }
    }
}
