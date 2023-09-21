using Bookit.Api.Middleware;
using Bookit.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Bookit.Api.Extensions;

public static class ApplicationBuilderExtensions
{
    //for local development
    public static void ApplyMigrations(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        dbContext.Database.Migrate();
    }

    public static void UseCustomExceptionHandler(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionHandlingMiddleware>();
    }
}
