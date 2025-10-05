# Python API Template

This template demonstrates how to connect to the mock API using Python.

## API Endpoints

- `GET http://localhost:3001/api/user` - Returns random user data
- `GET http://localhost:3001/api/product` - Returns random product data

## Prerequisites

Ensure the backend is running:

```bash
cd ../../backend
npm install
npm start
```

Install requests: `pip install requests`

## Usage

Run the examples:

```bash
python user.py
python product.py
```

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data.

```python
import requests

response = requests.get('http://localhost:3001/api/user')
user = response.json()
print('User:', user)
# In a web app, pass user to your template or update UI
```

Replace the mock API URL with your production API when ready.