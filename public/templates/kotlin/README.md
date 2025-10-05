# Kotlin API Template

This template demonstrates how to connect to the mock API using Kotlin.

## API Endpoints

- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data
- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

## Prerequisites

Ensure the backend is running:

```bash
cd ../../backend
npm install
npm start
```

## Usage

# Kotlin API Template

This template demonstrates how to connect to the mock API using Kotlin.

## API Endpoints

- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data
- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

## Usage

Compile and run the examples:

```bash
kotlinc User.kt -include-runtime -d User.jar
java -jar User.jar

kotlinc Product.kt -include-runtime -d Product.jar
java -jar Product.jar
```

## Building Frontend Apps

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data.

```kotlin
import java.net.URL
import kotlinx.serialization.json.Json

fun main() {
  val response = URL("https://real-time-backend-preview.vercel.app/api/user").readText()
  println("User: $response")
  // Parse with kotlinx.serialization and use in your Android or web app
}
```

Replace the mock API URL with your production API when ready.