# PHP API Integration

## Live Mock API Endpoints
- GET https://real-time-backend-preview.vercel.app/api/user
- GET https://real-time-backend-preview.vercel.app/api/product

## Basic cURL Usage

```php
<?php

class ApiClient {
    private $baseUrl = 'https://real-time-backend-preview.vercel.app';
    
    public function fetchUser() {
        $curl = curl_init();
        
        curl_setopt_array($curl, [
            CURLOPT_URL => $this->baseUrl . '/api/user',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        ]);
        
        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        
        if ($httpCode === 200) {
            echo "User Data: " . $response . "\n";
            return json_decode($response, true);
        } else {
            echo "Error fetching user data\n";
            return null;
        }
    }
    
    public function fetchProduct() {
        $curl = curl_init();
        
        curl_setopt_array($curl, [
            CURLOPT_URL => $this->baseUrl . '/api/product',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        ]);
        
        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        
        if ($httpCode === 200) {
            echo "Product Data: " . $response . "\n";
            return json_decode($response, true);
        } else {
            echo "Error fetching product data\n";
            return null;
        }
    }
}

// Usage
$client = new ApiClient();
$user = $client->fetchUser();
$product = $client->fetchProduct();

?>
```

## Laravel Integration

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MockDataController extends Controller
{
    private $mockApiUrl = 'https://real-time-backend-preview.vercel.app';
    
    public function getUser()
    {
        try {
            $response = Http::get($this->mockApiUrl . '/api/user');
            return response()->json($response->json());
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch user data'], 500);
        }
    }
    
    public function getProduct()
    {
        try {
            $response = Http::get($this->mockApiUrl . '/api/product');
            return response()->json($response->json());
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch product data'], 500);
        }
    }
}
```