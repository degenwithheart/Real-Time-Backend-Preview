using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program {
  static async Task Main() {
    using var client = new HttpClient();
    try {
      var response = await client.GetStringAsync("http://localhost:3001/api/user");
      Console.WriteLine("User: " + response);
    } catch (Exception e) {
      Console.WriteLine("Error: " + e.Message);
    }
  }
}