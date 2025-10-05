package main

import (
  "fmt"
  "net/http"
  "io"
)

func main() {
  // Fetch user
  resp, err := http.Get("https://real-time-backend-preview.vercel.app/api/user")
  if err != nil {
    fmt.Println("Error fetching user:", err)
    return
  }
  defer resp.Body.Close()
  userBody, err := io.ReadAll(resp.Body)
  if err != nil {
    fmt.Println("Error reading user:", err)
    return
  }
  fmt.Println("User:", string(userBody))

  // Fetch product
  resp2, err := http.Get("https://real-time-backend-preview.vercel.app/api/product")
  if err != nil {
    fmt.Println("Error fetching product:", err)
    return
  }
  defer resp2.Body.Close()
  productBody, err := io.ReadAll(resp2.Body)
  if err != nil {
    fmt.Println("Error reading product:", err)
    return
  }
  fmt.Println("Product:", string(productBody))
}