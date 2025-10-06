# Rust API Integration

## Live Mock API Endpoints
- GET https://real-time-backend-preview.vercel.app/api/user
- GET https://real-time-backend-preview.vercel.app/api/product

## Dependencies (Cargo.toml)
```toml
[dependencies]
reqwest = { version = "0.11", features = ["json"] }
tokio = { version = "1.0", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

## Basic Reqwest Usage

```rust
use reqwest;
use serde_json::Value;

const BASE_URL: &str = "https://real-time-backend-preview.vercel.app";

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let user_data = fetch_user().await?;
    println!("User Data: {}", serde_json::to_string_pretty(&user_data)?);
    
    let product_data = fetch_product().await?;
    println!("Product Data: {}", serde_json::to_string_pretty(&product_data)?);
    
    Ok(())
}

async fn fetch_user() -> Result<Value, reqwest::Error> {
    let url = format!("{}/api/user", BASE_URL);
    let response = reqwest::get(&url).await?;
    let user_data: Value = response.json().await?;
    Ok(user_data)
}

async fn fetch_product() -> Result<Value, reqwest::Error> {
    let url = format!("{}/api/product", BASE_URL);
    let response = reqwest::get(&url).await?;
    let product_data: Value = response.json().await?;
    Ok(product_data)
}
```

## Actix Web Integration

```rust
use actix_web::{web, App, HttpResponse, HttpServer, Result};
use reqwest;
use serde_json::Value;

const MOCK_API_URL: &str = "https://real-time-backend-preview.vercel.app";

async fn get_user() -> Result<HttpResponse> {
    match reqwest::get(&format!("{}/api/user", MOCK_API_URL)).await {
        Ok(response) => {
            match response.json::<Value>().await {
                Ok(data) => Ok(HttpResponse::Ok().json(data)),
                Err(_) => Ok(HttpResponse::InternalServerError().json("Failed to parse response")),
            }
        },
        Err(_) => Ok(HttpResponse::InternalServerError().json("Failed to fetch data")),
    }
}

async fn get_product() -> Result<HttpResponse> {
    match reqwest::get(&format!("{}/api/product", MOCK_API_URL)).await {
        Ok(response) => {
            match response.json::<Value>().await {
                Ok(data) => Ok(HttpResponse::Ok().json(data)),
                Err(_) => Ok(HttpResponse::InternalServerError().json("Failed to parse response")),
            }
        },
        Err(_) => Ok(HttpResponse::InternalServerError().json("Failed to fetch data")),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/api/user", web::get().to(get_user))
            .route("/api/product", web::get().to(get_product))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
```