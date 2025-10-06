# Go API Integration

## Live Mock API Endpoints
- GET https://real-time-backend-preview.vercel.app/api/user
- GET https://real-time-backend-preview.vercel.app/api/product

## Basic HTTP Client

```go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

const baseURL = "https://real-time-backend-preview.vercel.app"

func fetchUser() {
	resp, err := http.Get(baseURL + "/api/user")
	if err != nil {
		log.Printf("Error fetching user: %v", err)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading response: %v", err)
		return
	}

	fmt.Printf("User Data: %s\n", string(body))
}

func fetchProduct() {
	resp, err := http.Get(baseURL + "/api/product")
	if err != nil {
		log.Printf("Error fetching product: %v", err)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading response: %v", err)
		return
	}

	fmt.Printf("Product Data: %s\n", string(body))
}

func main() {
	fetchUser()
	fetchProduct()
}
```

## Gin Web Framework Integration

```go
package main

import (
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

const mockAPIURL = "https://real-time-backend-preview.vercel.app"

func getUser(c *gin.Context) {
	resp, err := http.Get(mockAPIURL + "/api/user")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	c.Data(http.StatusOK, "application/json", body)
}

func getProduct(c *gin.Context) {
	resp, err := http.Get(mockAPIURL + "/api/product")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	c.Data(http.StatusOK, "application/json", body)
}

func main() {
	r := gin.Default()
	r.GET("/api/user", getUser)
	r.GET("/api/product", getProduct)
	r.Run(":8080")
}
```