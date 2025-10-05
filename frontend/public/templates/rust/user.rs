use reqwest;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let res = reqwest::get("https://real-time-backend-preview.vercel.app/api/user").await?;
    let text = res.text().await?;
    println!("User: {}", text);
    Ok(())
}