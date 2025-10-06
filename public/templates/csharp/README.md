# C# API Integration

## Live Mock API Endpoints
- GET https://real-time-backend-preview.vercel.app/api/user
- GET https://real-time-backend-preview.vercel.app/api/product

## HttpClient Usage

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class ApiClient
{
    private static readonly HttpClient client = new HttpClient();
    private const string BaseUrl = "https://real-time-backend-preview.vercel.app";

    public static async Task<string> FetchUserAsync()
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync($"{BaseUrl}/api/user");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"User Data: {responseBody}");
            return responseBody;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Error: {e.Message}");
            return null;
        }
    }

    public static async Task<string> FetchProductAsync()
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync($"{BaseUrl}/api/product");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Product Data: {responseBody}");
            return responseBody;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Error: {e.Message}");
            return null;
        }
    }

    public static async Task Main(string[] args)
    {
        await FetchUserAsync();
        await FetchProductAsync();
    }
}
```

## ASP.NET Core Integration

```csharp
[ApiController]
[Route("api/[controller]")]
public class MockDataController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private const string MockApiUrl = "https://real-time-backend-preview.vercel.app";

    public MockDataController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("user")]
    public async Task<IActionResult> GetUser()
    {
        var response = await _httpClient.GetStringAsync($"{MockApiUrl}/api/user");
        return Ok(response);
    }

    [HttpGet("product")]
    public async Task<IActionResult> GetProduct()
    {
        var response = await _httpClient.GetStringAsync($"{MockApiUrl}/api/product");
        return Ok(response);
    }
}
```