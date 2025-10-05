use reqwest;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let res = reqwest::get("https://real-time-backend-preview.vercel.app/api/product").await?;
    let text = res.text().await?;
    println!("Product: {}", text);
    Ok(())
}