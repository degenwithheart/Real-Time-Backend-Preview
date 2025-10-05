import java.net.URL

fun main() {
  try {
    val userResponse = URL("http://localhost:3001/api/user").readText()
    println("User: $userResponse")

    val productResponse = URL("http://localhost:3001/api/product").readText()
    println("Product: $productResponse")
  } catch (e: Exception) {
    println("Error: ${e.message}")
  }
}