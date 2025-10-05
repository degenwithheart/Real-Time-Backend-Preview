import java.net.URL

fun main() {
  try {
    val response = URL("https://real-time-backend-preview.vercel.app/api/user").readText()
    println("User: $response")
  } catch (e: Exception) {
    println("Error: ${e.message}")
  }
}