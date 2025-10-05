use reqwest;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let res = reqwest::get("http://localhost:3001/api/product").await?;
    let text = res.text().await?;
    println!("Product: {}", text);
    Ok(())
}