using Bookit.Application.Abstractions.Authentication;
using Bookit.Application.Abstractions.Clock;
using Bookit.Application.Abstractions.Data;
using Bookit.Application.Abstractions.Email;
using Bookit.Domain.Abstractions;
using Bookit.Domain.Apartments;
using Bookit.Domain.Bookings;
using Bookit.Domain.Reviews;
using Bookit.Domain.Users;
using Bookit.Infrastructure.Authentication;
using Bookit.Infrastructure.Clock;
using Bookit.Infrastructure.Data;
using Bookit.Infrastructure.Email;
using Bookit.Infrastructure.Outbox;
using Bookit.Infrastructure.Repositories;
using Dapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Quartz;

namespace Bookit.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddTransient<IDateTimeProvider, DateTimeProvider>();
        services.AddTransient<IEmailService, EmailService>();

        AddPersistence(services, configuration);
        AddAuthentication(services, configuration);
        AddBackgroundJobs(services, configuration);

        return services;
    }

    private static void AddPersistence(IServiceCollection services, IConfiguration configuration)
    {
        var connectionString =
            configuration.GetConnectionString("Database")
            ?? throw new ArgumentNullException(nameof(configuration));

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(connectionString).UseSnakeCaseNamingConvention();
        });

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IApartmentRepository, ApartmentRepositroy>();
        services.AddScoped<IBookingRepository, BookingRepository>();
        services.AddScoped<IReviewRepository, ReviewRepository>();

        services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<ApplicationDbContext>());

        services.AddSingleton<ISqlConnectionFactory>(
            _ => new SqlConnectionFactory(connectionString)
        );

        SqlMapper.AddTypeHandler(new DateOnlyTypeHandler());
    }

    private static void AddAuthentication(IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();
        services.Configure<AuthenticationOptions>(configuration.GetSection("Authentication"));
        services.ConfigureOptions<JwtBearerOptionsSetup>();

        services.Configure<KeycloakOptions>(configuration.GetSection("Keycloak"));
        services.AddTransient<AdminAuthorizationDelegatingHandler>();

        services
            .AddHttpClient<IAuthenticationService, AuthenticationService>(
                (serviceProvider, httpClient) =>
                {
                    var keycloakOptions = serviceProvider
                        .GetRequiredService<IOptions<KeycloakOptions>>()
                        .Value;
                    httpClient.BaseAddress = new Uri(keycloakOptions.AdminUrl);
                }
            )
            .AddHttpMessageHandler<AdminAuthorizationDelegatingHandler>();

        services.AddHttpClient<IJwtService, JwtService>(
            (serviceProvider, httpClient) =>
            {
                var keycloakOptions = serviceProvider
                    .GetRequiredService<IOptions<KeycloakOptions>>()
                    .Value;
                httpClient.BaseAddress = new Uri(keycloakOptions.TokenUrl);
            }
        );

        services.AddHttpContextAccessor();

        services.AddScoped<IUserContext, UserContext>();
    }

    private static void AddBackgroundJobs(IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<OutboxOptions>(configuration.GetSection("Outbox"));

        services.AddQuartz(options =>
        {
            options.UseMicrosoftDependencyInjectionJobFactory();
        });
        services.AddQuartzHostedService(options =>
        {
            options.WaitForJobsToComplete = true;
        });
        services.ConfigureOptions<ProcessOutboxMessagesJobSetup>();
    }
}
