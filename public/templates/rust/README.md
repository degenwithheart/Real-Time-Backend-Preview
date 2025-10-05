# Rust API Template

This template demonstrates how to connect to the mock API using Rust.

## API Endpoints

- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data
- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

## Usage

For each example, create a new Cargo project:

```bash
cargo new user_app
cd user_app
# Copy user.rs to src/main.rs
# Add to Cargo.toml:
# [dependencies]
# reqwest = { version = "0.11", features = ["json"] }
# tokio = { version = "1", features = ["full"] }
cargo run
```

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data.

```rust
use reqwest;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let res = reqwest::get("https://real-time-backend-preview.vercel.app/api/user").await?;
    let text = res.text().await?;
    println!("User: {}", text);
    // Deserialize with serde_json and use in your web app
    Ok(())
}
```

Replace the mock API URL with your production API when ready.