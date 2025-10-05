use reqwest;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let user_res = reqwest::get("http://localhost:3001/api/user").await?;
    let user_text = user_res.text().await?;
    println!("User: {}", user_text);

    let product_res = reqwest::get("http://localhost:3001/api/product").await?;
    let product_text = product_res.text().await?;
    println!("Product: {}", product_text);
    Ok(())
}