# C# API Template

This template demonstrates how to connect to the mock API using C#.

## API Endpoints

- `GET http://localhost:3001/api/user` - Returns random user data
- `GET http://localhost:3001/api/product` - Returns random product data

## Prerequisites

Ensure the backend is running:

```bash
cd ../../backend
npm install
npm start
```

Install .NET SDK.

## Usage

Create a console app and run:

```bash
dotnet new console -n UserApp
cd UserApp
# Copy User.cs content to Program.cs
dotnet run
```

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data.

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program {
  static async Task Main() {
    using var client = new HttpClient();
    var response = await client.GetStringAsync("http://localhost:3001/api/user");
    Console.WriteLine("User: " + response);
    // Deserialize with System.Text.Json and use in your app
  }
}
```

Replace the mock API URL with your production API when ready.