# API Templates

These templates demonstrate how to fetch user and product data from the mock API running on Vercel edge functions.

## Prerequisites

The API is automatically available when deployed to Vercel. For local development:

```bash
# Install dependencies
npm install

# Start development server (includes API routes)
npm run dev
```

The API will be available at `/api/user` and `/api/product`.

## Running the Templates

### JavaScript
- Open `javascript/index.html` in your browser
- Or serve locally: `npx serve .` then visit the HTML files

### TypeScript
- Open `typescript/index.html` in your browser
- Or compile: `tsc typescript/user.ts` then `node typescript/user.js`

### Python
- `python python/user.py`
- Or open `python/index.html` in your browser

### Java
- `javac java/User.java && java User`
- Or open `java/index.html` in your browser

### C#
- `dotnet run` in the csharp directory
- Or open `csharp/index.html` in your browser

### Go
- `go run user.go`
- Or open `go/index.html` in your browser

### PHP
- `php user.php` (requires PHP installed)
- Or open `php/index.html` in your browser

### Ruby
- `ruby user.rb`
- Or open `ruby/index.html` in your browser

### Rust
- `cargo run` in the rust directory
- Or open `rust/index.html` in your browser

### Kotlin
- `./gradlew run` in the kotlin directory
- Or open `kotlin/index.html` in your browser

## API Endpoints

- `GET /api/user` - Returns mock user data
- `GET /api/product` - Returns mock product data

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "message": "Success message",
  "data": { /* actual data */ },
  "timestamp": "ISO date string"
}
```

## Deployment

These templates are designed to work with the Vercel deployment. When you deploy to Vercel, the API endpoints will be automatically available.
- `node javascript/product.js`

### TypeScript
Install ts-node: `npm install -g ts-node`
- `ts-node typescript/user.ts`
- `ts-node typescript/product.ts`

### Python
Install requests: `pip install requests`
- `python python/user.py`
- `python python/product.py`

### Java
- `javac java/User.java && java User`
- `javac java/Product.java && java Product`

### C#
Create a new console app and copy the code, or use dotnet script.
- Install dotnet-script: `dotnet tool install -g dotnet-script`
- `dotnet script csharp/User.cs`
- `dotnet script csharp/Product.cs`

### Go
- `go run go/user.go`
- `go run go/product.go`

### PHP
- `php php/user.php`
- `php php/product.php`

### Ruby
- `ruby ruby/user.rb`
- `ruby ruby/product.rb`

### Rust
For each:
- `cargo new user_template`
- `cd user_template`
- Copy the content from `rust/user.rs` to `src/main.rs`
- Edit `Cargo.toml` to add:
  ```
  [dependencies]
  reqwest = { version = "0.11", features = ["json"] }
  tokio = { version = "1", features = ["full"] }
  ```
- `cargo run`

Repeat for product.

### Kotlin
- `kotlinc kotlin/User.kt -include-runtime -d User.jar && java -jar User.jar`
- `kotlinc kotlin/Product.kt -include-runtime -d Product.jar && java -jar Product.jar`