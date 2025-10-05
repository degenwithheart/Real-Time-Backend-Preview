use reqwest;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let res = reqwest::get("http://localhost:3001/api/user").await?;
    let text = res.text().await?;
    println!("User: {}", text);
    Ok(())
}