using System.Net.Http.Json;
using Bookit.Application.Abstractions.Authentication;
using Bookit.Domain.Users;
using Bookit.Infrastructure.Authentication.Models;

namespace Bookit.Infrastructure.Authentication
{
    internal sealed class AuthenticationService : IAuthenticationService
    {
        private const string PasswordCredentialType = "password";
        private readonly HttpClient _httpClient;

        public AuthenticationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> RegisterAsync(
            User user,
            string password,
            CancellationToken cancellationToken = default
        )
        {
            var userRepresentationModel = UserRepresentationModel.FromUser(user);

            userRepresentationModel.Credentials = new CredentialRepresentationModel[]
            {
                new()
                {
                    Value = password,
                    Temporary = false,
                    Type = PasswordCredentialType
                }
            };

            var response = await _httpClient.PostAsJsonAsync(
                "users",
                userRepresentationModel,
                cancellationToken
            );

            return ExtractIdentityIdFromLocationHeader(response);
        }

        private static string ExtractIdentityIdFromLocationHeader(
            HttpResponseMessage httpResponseMessage
        )
        {
            const string userSegmentName = "users/";
            var locationHeader = httpResponseMessage.Headers.Location?.PathAndQuery;

            if (locationHeader is null)
            {
                throw new InvalidOperationException(
                    "The response does not contain a location header."
                );
            }

            var segmentValueIndex = locationHeader.IndexOf(
                userSegmentName,
                StringComparison.InvariantCultureIgnoreCase
            );

            var userIdentityId = locationHeader.Substring(
                segmentValueIndex + userSegmentName.Length
            );

            return userIdentityId;
        }
    }
}
