# Kotlin API Integration

## Live Mock API Endpoints
- GET https://real-time-backend-preview.vercel.app/api/user
- GET https://real-time-backend-preview.vercel.app/api/product

## Basic HTTP Client

```kotlin
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.net.URI
import kotlinx.coroutines.*

class ApiClient {
    companion object {
        private const val BASE_URL = "https://real-time-backend-preview.vercel.app"
        private val client = HttpClient.newHttpClient()
    }
    
    suspend fun fetchUser(): String? {
        return withContext(Dispatchers.IO) {
            try {
                val request = HttpRequest.newBuilder()
                    .uri(URI.create("$BASE_URL/api/user"))
                    .GET()
                    .build()
                
                val response = client.send(request, HttpResponse.BodyHandlers.ofString())
                println("User Data: ${response.body()}")
                response.body()
            } catch (e: Exception) {
                println("Error fetching user: ${e.message}")
                null
            }
        }
    }
    
    suspend fun fetchProduct(): String? {
        return withContext(Dispatchers.IO) {
            try {
                val request = HttpRequest.newBuilder()
                    .uri(URI.create("$BASE_URL/api/product"))
                    .GET()
                    .build()
                
                val response = client.send(request, HttpResponse.BodyHandlers.ofString())
                println("Product Data: ${response.body()}")
                response.body()
            } catch (e: Exception) {
                println("Error fetching product: ${e.message}")
                null
            }
        }
    }
}

suspend fun main() {
    val client = ApiClient()
    client.fetchUser()
    client.fetchProduct()
}
```

## Spring Boot Integration

```kotlin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate
import org.springframework.http.ResponseEntity

@RestController
@RequestMapping("/api")
class MockDataController {
    
    private val restTemplate = RestTemplate()
    private val mockApiUrl = "https://real-time-backend-preview.vercel.app"
    
    @GetMapping("/user")
    fun getUser(): ResponseEntity<String> {
        return try {
            val response = restTemplate.getForObject("$mockApiUrl/api/user", String::class.java)
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.internalServerError().body("Error fetching user data")
        }
    }
    
    @GetMapping("/product")
    fun getProduct(): ResponseEntity<String> {
        return try {
            val response = restTemplate.getForObject("$mockApiUrl/api/product", String::class.java)
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.internalServerError().body("Error fetching product data")
        }
    }
}
```

## Ktor Integration

```kotlin
import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8080) {
        val client = HttpClient()
        val mockApiUrl = "https://real-time-backend-preview.vercel.app"
        
        routing {
            get("/api/user") {
                try {
                    val response: HttpResponse = client.get("$mockApiUrl/api/user")
                    call.respondText(response.readText())
                } catch (e: Exception) {
                    call.respondText("Error fetching user data")
                }
            }
            
            get("/api/product") {
                try {
                    val response: HttpResponse = client.get("$mockApiUrl/api/product")
                    call.respondText(response.readText())
                } catch (e: Exception) {
                    call.respondText("Error fetching product data")
                }
            }
        }
    }.start(wait = true)
}
```