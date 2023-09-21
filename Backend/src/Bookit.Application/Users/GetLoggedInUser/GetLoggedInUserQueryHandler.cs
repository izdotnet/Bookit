﻿using Bookit.Application.Abstractions.Authentication;
using Bookit.Application.Abstractions.Data;
using Bookit.Application.Abstractions.Messaging;
using Bookit.Domain.Abstractions;
using Dapper;

namespace Bookit.Application.Users.GetLoggedInUser;

internal sealed class GetLoggedInUserQueryHandler
    : IQueryHandler<GetLoggedInUserQuery, UserResponse>
{
    private readonly ISqlConnectionFactory _sqlConnectionFactory;
    private readonly IUserContext _userContext;

    public GetLoggedInUserQueryHandler(
        ISqlConnectionFactory sqlConnectionFactory,
        IUserContext userContext
    )
    {
        _sqlConnectionFactory = sqlConnectionFactory;
        _userContext = userContext;
    }

    public async Task<Result<UserResponse>> Handle(
        GetLoggedInUserQuery request,
        CancellationToken cancellationToken
    )
    {
        using var connection = _sqlConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                id AS Id,
                first_name || ' ' || last_name AS Name,
                email AS Email,
                "is_admin" AS IsAdmin
            FROM users
            WHERE identity_id = @IdentityId
            """;

        var user = await connection.QuerySingleAsync<UserResponse>(
            sql,
            new { _userContext.IdentityId }
        );

        return user;
    }
}
