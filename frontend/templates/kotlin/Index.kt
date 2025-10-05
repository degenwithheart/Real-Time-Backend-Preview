import java.net.URL

fun main() {
  try {
    val userResponse = URL("https://real-time-backend-preview.vercel.app/api/user").readText()
    println("User: $userResponse")

    val productResponse = URL("https://real-time-backend-preview.vercel.app/api/product").readText()
    println("Product: $productResponse")
  } catch (e: Exception) {
    println("Error: ${e.message}")
  }
}