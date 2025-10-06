# Python API Integration Guide

## Quick Start

Get started with our API using Python and the requests library.

### Installation

```bash
pip install requests
```

### Basic Usage

```py
import requests

response = requests.get('https://api.your-domain.com/users')
users = response.json()
print(users)
```

### Authentication

All API requests require authentication. Include your API token in the Authorization header:

```py
headers = {
    'Authorization': 'Bearer your-token-here',
    'Content-Type': 'application/json'
}
response = requests.get('https://api.your-domain.com/users', headers=headers)
```

### Creating Data

To create new resources, send a POST request with JSON data:

```py
user_data = {'name': 'John Doe', 'email': 'john@example.com'}

response = requests.post(
    'https://api.your-domain.com/users',
    headers=headers,
    json=user_data
)
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

```py
try:
    response = requests.get('https://api.your-domain.com/users')
    response.raise_for_status()
    users = response.json()
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
```

## Rate Limiting

- **Rate Limit**: 1000 requests per hour per API key
- **Headers**: Check `X-RateLimit-Remaining` and `X-RateLimit-Reset`

## Pagination Example

```py
def fetch_all_users():
    page = 1
    all_users = []
    
    while True:
        response = requests.get(f'https://api.your-domain.com/users?page={page}')
        data = response.json()
        
        all_users.extend(data['data'])
        
        if not data['data'] or page >= data['meta']['total_pages']:
            break
        page += 1
    
    return all_users
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

Check our [community page](https://community.your-domain.com/sdks) for Python libraries maintained by the community.
