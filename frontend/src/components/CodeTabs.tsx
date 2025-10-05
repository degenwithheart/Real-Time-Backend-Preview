import { useState } from 'react';
import '../App.css';

const codeSamples: Record<string, string> = {
  JavaScript: `import axios from 'axios';
axios.get('/api/user').then(res => console.log(res.data));`,

  TypeScript: `import axios from 'axios';
(async () => {
  const { data } = await axios.get('/api/user');
  console.log(data);
})();`,

  Python: `import requests
print(requests.get("http://localhost:3001/api/user").json())`,

  Java: `import java.net.*;
import java.io.*;
public class Main {
  public static void main(String[] args) throws Exception {
    URL url = new URL("http://localhost:3001/api/user");
    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
    String inputLine;
    while ((inputLine = in.readLine()) != null)
        System.out.println(inputLine);
    in.close();
  }
}`,

  'C#': `using System;
using System.Net.Http;
using System.Threading.Tasks;
class Program {
  static async Task Main() {
    var client = new HttpClient();
    var response = await client.GetStringAsync("http://localhost:3001/api/user");
    Console.WriteLine(response);
  }
}`,

  Go: `package main
import ("fmt"; "net/http"; "io/ioutil")
func main() {
  resp, _ := http.Get("http://localhost:3001/api/user")
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`,

  PHP: `<?php
echo file_get_contents("http://localhost:3001/api/user");
?>`,

  Ruby: `require 'net/http'
puts Net::HTTP.get(URI('http://localhost:3001/api/user'))`,

  Rust: `use reqwest;
#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let res = reqwest::get("http://localhost:3001/api/user").await?;
    println!("{}", res.text().await?);
    Ok(())
}`,

  Kotlin: `import java.net.URL
fun main() {
  val response = URL("http://localhost:3001/api/user").readText()
  println(response)
}`
};

export default function CodeTabs() {
  const [activeLang, setActiveLang] = useState("JavaScript");
  return (
    <div className="code-tabs">
      <div className="tab-bar">
        {Object.keys(codeSamples).map(lang => (
          <button
            key={lang}
            className={activeLang === lang ? "active" : ""}
            onClick={() => setActiveLang(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <pre className="code-block">
        {codeSamples[activeLang]}
      </pre>
    </div>
  );
}