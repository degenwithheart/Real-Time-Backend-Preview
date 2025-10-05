import java.net.URL

fun main() {
  try {
    val response = URL("https://real-time-backend-preview.vercel.app/api/product").readText()
    println("Product: $response")
  } catch (e: Exception) {
    println("Error: ${e.message}")
  }
}