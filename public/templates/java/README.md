# Java API Integration

## Live Mock API Endpoints
- GET https://real-time-backend-preview.vercel.app/api/user
- GET https://real-time-backend-preview.vercel.app/api/product

## Basic HTTP Client

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ApiClient {
    private static final String BASE_URL = "https://real-time-backend-preview.vercel.app";
    private static final HttpClient client = HttpClient.newHttpClient();
    private static final ObjectMapper mapper = new ObjectMapper();

    public static void fetchUser() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/api/user"))
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        System.out.println("User Data: " + response.body());
    }

    public static void fetchProduct() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/api/product"))
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        System.out.println("Product Data: " + response.body());
    }

    public static void main(String[] args) {
        try {
            fetchUser();
            fetchProduct();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## Spring Boot Integration

```java
@RestController
@RequestMapping("/api")
public class MockDataController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    private static final String MOCK_API_URL = "https://real-time-backend-preview.vercel.app";
    
    @GetMapping("/user")
    public ResponseEntity<String> getUser() {
        String response = restTemplate.getForObject(MOCK_API_URL + "/api/user", String.class);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/product")
    public ResponseEntity<String> getProduct() {
        String response = restTemplate.getForObject(MOCK_API_URL + "/api/product", String.class);
        return ResponseEntity.ok(response);
    }
}
```