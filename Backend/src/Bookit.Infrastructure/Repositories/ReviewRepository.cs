﻿using Bookit.Domain.Reviews;

namespace Bookit.Infrastructure.Repositories;

internal sealed class ReviewRepository : Repository<Review, ReviewId>, IReviewRepository
{
    public ReviewRepository(ApplicationDbContext dbContext) : base(dbContext) { }
}
