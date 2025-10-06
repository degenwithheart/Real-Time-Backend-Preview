# Shell API Integration Guide

## Quick Start

Get started with our API using Shell and the curl library.

### Installation

Most systems include curl. If not:
```bash
# Ubuntu/Debian
sudo apt-get install curl

# macOS
brew install curl
```

### Basic Usage

```sh
#!/bin/bash
curl -X GET "https://real-time-backend-preview.vercel.app/users"
```

### Authentication

All API requests require authentication. Include your API token in the Authorization header:

```sh
curl -X GET "https://real-time-backend-preview.vercel.app/users" \
  -H "Authorization: Bearer your-token-here" \
  -H "Content-Type: application/json"
```

### Creating Data

To create new resources, send a POST request with JSON data:

```sh
curl -X POST "https://real-time-backend-preview.vercel.app/users" \
  -H "Authorization: Bearer your-token-here" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

## API Endpoints

### Users
- **GET** `/users` - Fetch all users
- **GET** `/users/{id}` - Fetch specific user
- **POST** `/users` - Create new user
- **PUT** `/users/{id}` - Update user
- **DELETE** `/users/{id}` - Delete user

### Products
- **GET** `/products` - Fetch all products
- **GET** `/products/{id}` - Fetch specific product  
- **POST** `/products` - Create new product
- **PUT** `/products/{id}` - Update product
- **DELETE** `/products/{id}` - Delete product

## Response Format

All API responses are in JSON format:

```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "per_page": 20
  }
}
```

## Error Handling

```sh
# Check HTTP status code
if ! curl -f -s "https://real-time-backend-preview.vercel.app/users" > /dev/null; then
    echo "Request failed"
    exit 1
fi
```

## Rate Limiting

- **Rate Limit**: 1000 requests per hour per API key
- **Headers**: Check `X-RateLimit-Remaining` and `X-RateLimit-Reset`

## Pagination Example

```sh
# Fetch all pages
page=1
while true; do
    response=$(curl -s "https://real-time-backend-preview.vercel.app/users?page=$page")
    if [ "$(echo "$response" | jq '.data | length')" -eq 0 ]; then
        break
    fi
    echo "$response" | jq '.data[]'
    ((page++))
done
```

## Best Practices

1. **Always handle errors gracefully**
2. **Implement exponential backoff for retries**
3. **Cache responses when appropriate** 
4. **Use connection pooling for better performance**
5. **Validate input data before sending requests**

## Support

- 📚 [Full API Documentation](https://docs.your-domain.com)
- 💬 [Community Support](https://community.your-domain.com)
- 🐛 [Report Issues](https://github.com/your-org/api-issues)
- 📧 [Email Support](mailto:support@your-domain.com)

## SDK Information

### Official SDKs

We provide official SDKs for popular languages:
- [JavaScript/TypeScript SDK](https://npm.com/@your-org/api-sdk)
- [Python SDK](https://pypi.org/project/your-org-api/)
- [Go SDK](https://github.com/your-org/go-sdk)

### Community Libraries

Check our [community page](https://community.your-domain.com/sdks) for Shell libraries maintained by the community.
