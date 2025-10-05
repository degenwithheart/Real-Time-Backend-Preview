using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program {
  static async Task Main() {
    using var client = new HttpClient();
    try {
      var response = await client.GetStringAsync("https://real-time-backend-preview.vercel.app/api/user");
      Console.WriteLine("User: " + response);
    } catch (Exception e) {
      Console.WriteLine("Error: " + e.Message);
    }
  }
}