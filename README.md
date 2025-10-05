# 🌀 Real-Time Backend Preview

Mock and preview backend APIs in real time for frontend developers. Deployable to Vercel with edge runtimes.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/backend-preview)

## Features

- 🎭 **Faker-based** random data generation
- ⚡ **Vercel Edge Functions** - Serverless API routes
- 🖥️ **Modern React Frontend** - TypeScript + Vite
- 📱 **Mobile-First Design** - Responsive across all devices
- 🔧 **10 Language Templates** - Ready-to-use code examples
- 🎨 **Beautiful UI** - Modern design with smooth animations

## Project Structure

```
/
├── api/                   # Vercel API routes (serverless functions)
│   ├── user.js           # User data endpoint
│   ├── product.js        # Product data endpoint
│   └── health.js         # Health check endpoint
├── src/                  # React application
├── public/               # Static assets
├── templates/            # Language-specific examples
│   ├── javascript/
│   ├── typescript/
│   ├── python/
│   ├── java/
│   ├── csharp/
│   ├── go/
│   ├── php/
│   ├── ruby/
│   ├── rust/
│   └── kotlin/
├── vercel.json           # Vercel configuration
└── package.json
```

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Auto-Deploy**: Vercel automatically detects the configuration
3. **Edge Functions**: API routes run as Vercel Edge Functions

The `vercel.json` handles:
- Static site generation with Vite
- API routes as serverless functions
- SPA routing fallback
```
│   ├── javascript/
│   ├── typescript/
│   ├── python/
│   ├── java/
│   ├── csharp/
│   ├── go/
│   ├── php/
│   ├── ruby/
│   ├── rust/
│   └── kotlin/
└── backend/               # Legacy Express server (for local dev)
```

## API Endpoints

### GET /api/user
Returns mock user data with extended fields.

**Query Parameters:**
- `locale` (optional): Faker locale (default: 'en')

**Response:**
```json
{
  "success": true,
  "message": "User data retrieved successfully",
  "data": {
    "id": 1234,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "address": "123 Main St",
    "company": "Tech Corp",
    "avatar": "https://example.com/avatar.jpg",
    "phone": "+1-555-123-4567",
    "createdAt": "2023-01-15T10:30:00.000Z"
  },
  "timestamp": "2025-10-05T12:00:00.000Z"
}
```

### GET /api/product
Returns mock product data with extended fields.

**Query Parameters:**
- `category` (optional): Product category
- `minPrice` (optional): Minimum price (default: 5)
- `maxPrice` (optional): Maximum price (default: 500)

### GET /api/health
Health check endpoint for monitoring.

## Development

### Local Development

```bash
# Frontend only (recommended for Vercel deployment)
cd frontend
npm install
npm run dev

# Full-stack local development (legacy)
cd backend
npm install
npm run dev
# In another terminal
cd frontend
npm run dev
```

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Auto-Deploy**: Vercel automatically detects the configuration
3. **Edge Functions**: API routes run as Vercel Edge Functions

The `vercel.json` handles:
- Static site generation with Vite
- API routes as serverless functions
- SPA routing fallback

## Language Templates

The project includes 10 complete language implementations demonstrating API integration with the mock backend. Each template shows how to fetch user and product data from the Vercel Edge Functions API.

### Template Structure

Each language folder contains:
- **`index.html`** - Interactive demo page with buttons to fetch data
- **`user.html`** - Dedicated page displaying user data
- **`product.html`** - Dedicated page displaying product data
- **`README.md`** - Language-specific implementation guide
- **`[language].*`** - Source code examples (`.js`, `.ts`, `.py`, etc.)
- **`styles.css`** - Consistent mobile-first styling

### API Integration Pattern

All templates follow this consistent pattern:

1. **Fetch Data**: Make HTTP requests to `/api/user` and `/api/product`
2. **Handle Response**: Parse JSON response with `{success, message, data, timestamp}` structure
3. **Display Data**: Render the `data` field contents in the UI
4. **Error Handling**: Graceful error handling for failed requests

### JavaScript Template

**Files**: `templates/javascript/`
- **API Calls**: Uses `fetch()` API with promises
- **Response Handling**: Direct JSON parsing and DOM manipulation
- **Demo**: Interactive buttons trigger API calls and display results

```javascript
// Example from javascript/user.html
fetch('/api/user')
  .then(response => response.json())
  .then(responseData => {
    const data = responseData.data || responseData; // Handle response format
    document.getElementById('user').innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      // ... more fields
    `;
  })
  .catch(error => {
    console.error('Error fetching user:', error);
  });
```

### TypeScript Template

**Files**: `templates/typescript/`
- **Type Safety**: Full TypeScript interfaces for API responses
- **Type Definitions**: Strongly typed data structures
- **Compilation**: Can be compiled to JavaScript for execution

```typescript
// Example type definitions
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  company: string;
  avatar: string;
  phone: string;
  createdAt: string;
}

// Usage
fetch('/api/user')
  .then(response => response.json())
  .then((response: ApiResponse<User>) => {
    if (response.success) {
      displayUser(response.data);
    }
  });
```

### Python Template

**Files**: `templates/python/`
- **HTTP Library**: Uses `requests` library for API calls
- **JSON Handling**: Built-in `json` module for parsing
- **Execution**: Run with `python user.py`

```python
import requests
import json

# Fetch user data
response = requests.get('/api/user')
if response.status_code == 200:
    data = response.json()
    if data['success']:
        user = data['data']
        print(f"Name: {user['name']}")
        print(f"Email: {user['email']}")
        print(f"Company: {user['company']}")
```

### Java Template

**Files**: `templates/java/`
- **HTTP Client**: Uses `HttpURLConnection` or Apache HttpClient
- **JSON Parsing**: Jackson or Gson libraries for JSON handling
- **Execution**: Compile with `javac`, run with `java`

```java
// Using HttpURLConnection
URL url = new URL("/api/user");
HttpURLConnection conn = (HttpURLConnection) url.openConnection();
conn.setRequestMethod("GET");

BufferedReader reader = new BufferedReader(
    new InputStreamReader(conn.getInputStream()));
String response = reader.readLine();
reader.close();

// Parse JSON response
JSONObject jsonResponse = new JSONObject(response);
if (jsonResponse.getBoolean("success")) {
    JSONObject user = jsonResponse.getJSONObject("data");
    System.out.println("Name: " + user.getString("name"));
}
```

### C# Template

**Files**: `templates/csharp/`
- **HTTP Client**: Uses `HttpClient` class
- **JSON Handling**: System.Text.Json or Newtonsoft.Json
- **Execution**: `dotnet run` or compile to executable

```csharp
using System.Net.Http;
using System.Text.Json;

var client = new HttpClient();
var response = await client.GetAsync("/api/user");
var jsonString = await response.Content.ReadAsStringAsync();

var apiResponse = JsonSerializer.Deserialize<ApiResponse<User>>(jsonString);
if (apiResponse.Success)
{
    var user = apiResponse.Data;
    Console.WriteLine($"Name: {user.Name}");
    Console.WriteLine($"Email: {user.Email}");
}
```

### Go Template

**Files**: `templates/go/`
- **HTTP Client**: Standard `net/http` package
- **JSON Handling**: Built-in `encoding/json` package
- **Execution**: `go run user.go`

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type ApiResponse struct {
    Success bool   `json:"success"`
    Message string `json:"message"`
    Data    User   `json:"data"`
    Timestamp string `json:"timestamp"`
}

type User struct {
    ID      int    `json:"id"`
    Name    string `json:"name"`
    Email   string `json:"email"`
    Address string `json:"address"`
    Company string `json:"company"`
}

func main() {
    resp, err := http.Get("/api/user")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    var apiResp ApiResponse
    json.NewDecoder(resp.Body).Decode(&apiResp)

    if apiResp.Success {
        fmt.Printf("Name: %s\n", apiResp.Data.Name)
        fmt.Printf("Email: %s\n", apiResp.Data.Email)
    }
}
```

### PHP Template

**Files**: `templates/php/`
- **HTTP Requests**: `file_get_contents()` or cURL
- **JSON Handling**: Built-in `json_decode()` function
- **Execution**: `php user.php` or via web server

```php
<?php
// Using file_get_contents
$userJson = file_get_contents('/api/user');
if ($userJson !== false) {
    $response = json_decode($userJson, true);
    if ($response['success']) {
        $user = $response['data'];
        echo "Name: " . $user['name'] . "\n";
        echo "Email: " . $user['email'] . "\n";
        echo "Company: " . $user['company'] . "\n";
    }
}

// Alternative using cURL
$ch = curl_init('/api/user');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$userJson = curl_exec($ch);
curl_close($ch);

$response = json_decode($userJson, true);
// ... process response
?>
```

### Ruby Template

**Files**: `templates/ruby/`
- **HTTP Client**: `net/http` standard library or `httparty` gem
- **JSON Handling**: Built-in `json` library
- **Execution**: `ruby user.rb`

```ruby
require 'net/http'
require 'json'

uri = URI('/api/user')
response = Net::HTTP.get(uri)
data = JSON.parse(response)

if data['success']
  user = data['data']
  puts "Name: #{user['name']}"
  puts "Email: #{user['email']}"
  puts "Company: #{user['company']}"
end
```

### Rust Template

**Files**: `templates/rust/`
- **HTTP Client**: `reqwest` crate for async HTTP requests
- **JSON Handling**: `serde` with `serde_json` for serialization
- **Execution**: `cargo run`

```rust
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct ApiResponse<T> {
    success: bool,
    message: String,
    data: T,
    timestamp: String,
}

#[derive(Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
    address: String,
    company: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();
    let response = client
        .get("/api/user")
        .send()
        .await?;

    let api_response: ApiResponse<User> = response
        .json()
        .await?;

    if api_response.success {
        println!("Name: {}", api_response.data.name);
        println!("Email: {}", api_response.data.email);
    }

    Ok(())
}
```

### Kotlin Template

**Files**: `templates/kotlin/`
- **HTTP Client**: `java.net.HttpURLConnection` or Ktor library
- **JSON Handling**: Gson or kotlinx.serialization
- **Execution**: `kotlinc user.kt -include-runtime -d user.jar && java -jar user.jar`

```kotlin
import com.google.gson.Gson
import java.net.HttpURLConnection
import java.net.URL

data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T,
    val timestamp: String
)

data class User(
    val id: Int,
    val name: String,
    val email: String,
    val address: String,
    val company: String
)

fun main() {
    val url = URL("/api/user")
    val connection = url.openConnection() as HttpURLConnection

    try {
        val response = connection.inputStream.bufferedReader().readText()
        val gson = Gson()
        val apiResponse = gson.fromJson(response, ApiResponse::class.java)

        if (apiResponse.success) {
            val user = gson.fromJson(gson.toJson(apiResponse.data), User::class.java)
            println("Name: ${user.name}")
            println("Email: ${user.email}")
        }
    } finally {
        connection.disconnect()
    }
}
```

### Running the Templates

**Web Browser**: Open any `index.html` file directly in your browser (works with Vercel deployment)

**Command Line**: Each language has executable examples:
- JavaScript: `node javascript/user.js`
- TypeScript: `tsc typescript/user.ts && node typescript/user.js`
- Python: `python python/user.py`
- Java: `javac java/User.java && java User`
- C#: `dotnet run` (in csharp directory)
- Go: `go run user.go`
- PHP: `php user.php`
- Ruby: `ruby user.rb`
- Rust: `cargo run` (in rust directory)
- Kotlin: `./gradlew run` (in kotlin directory)

### API Response Format

All templates handle this consistent response structure:

```json
{
  "success": true,
  "message": "User data retrieved successfully",
  "data": {
    // Actual data object (User or Product)
  },
  "timestamp": "2025-10-05T12:00:00.000Z"
}
```

### Error Handling

Templates include error handling for:
- Network failures
- Invalid JSON responses
- API errors (success: false)
- Missing data fields

This ensures robust operation across different environments and API states.

## Technologies

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Vercel Edge Functions (Node.js)
- **Data**: Faker.js for mock generation
- **Styling**: CSS with mobile-first design
- **Deployment**: Vercel platform

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on Vercel deployment
5. Submit a pull request

## License

MIT License
