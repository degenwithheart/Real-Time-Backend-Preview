import java.net.URL

fun main() {
  try {
    val response = URL("http://localhost:3001/api/user").readText()
    println("User: $response")
  } catch (e: Exception) {
    println("Error: ${e.message}")
  }
}