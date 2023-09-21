namespace Bookit.Infrastructure.Authentication;

public sealed class AuthenticationOptions
{
    public string Audience { get; init; } = String.Empty;
    public string MetadataUrl { get; init; } = String.Empty;
    public bool RequireHttpsMetadata { get; init; }
    public string Issuer { get; init; } = String.Empty;
}
