package main

import (
  "fmt"
  "net/http"
  "io"
)

func main() {
  resp, err := http.Get("http://localhost:3001/api/product")
  if err != nil {
    fmt.Println("Error:", err)
    return
  }
  defer resp.Body.Close()
  body, err := io.ReadAll(resp.Body)
  if err != nil {
    fmt.Println("Error:", err)
    return
  }
  fmt.Println("Product:", string(body))
}