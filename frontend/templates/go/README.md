# Go API Template

This template demonstrates how to connect to the mock API using Go.

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

Run the examples:

```bash
go run user.go
go run product.go
```

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data.

```go
package main

import (
  "fmt"
  "net/http"
  "io"
)

func main() {
  resp, err := http.Get("https://real-time-backend-preview.vercel.app/api/user")
  if err != nil {
    fmt.Println(err)
    return
  }
  defer resp.Body.Close()
  body, err := io.ReadAll(resp.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println("User:", string(body))
  // Unmarshal with encoding/json and use in your app
}
```

Replace the mock API URL with your production API when ready.