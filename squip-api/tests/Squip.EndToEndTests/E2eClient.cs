using System;
using RestSharp;

namespace Squip.EndToEndTests;

/// <summary>
/// Shared factory for the RestSharp client used by the end-to-end tests.
/// The API base URL defaults to the local dev server but can be overridden
/// via the <c>SQUIP_E2E_BASE_URL</c> environment variable so the same tests
/// can run against any environment (staging, a container host, etc.).
/// </summary>
public static class E2eClient
{
    public const string BaseUrlEnvVar = "SQUIP_E2E_BASE_URL";
    public const string DefaultBaseUrl = "https://localhost:8080/api";

    public static string BaseUrl
    {
        get
        {
            var value = Environment.GetEnvironmentVariable(BaseUrlEnvVar);
            return string.IsNullOrWhiteSpace(value) ? DefaultBaseUrl : value;
        }
    }

    public static RestClient Create() => new RestClient(BaseUrl);
}
