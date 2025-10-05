import java.net.URL

fun main() {
  try {
    val response = URL("http://localhost:3001/api/product").readText()
    println("Product: $response")
  } catch (e: Exception) {
    println("Error: ${e.message}")
  }
}