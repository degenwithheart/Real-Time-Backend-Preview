# Python API Integration

## API Endpoints
- GET /api/user - Returns random user data
- GET /api/product - Returns random product data

Base URL: https://real-time-backend-preview.vercel.app

## Installation
```bash
pip install requests
```

## Basic Usage

```python
import requests
import json

# Fetch user data
def fetch_user():
    response = requests.get('https://real-time-backend-preview.vercel.app/api/user')
    user_data = response.json()
    print('User:', json.dumps(user_data, indent=2))
    return user_data

# Fetch product data
def fetch_product():
    response = requests.get('https://real-time-backend-preview.vercel.app/api/product')
    product_data = response.json()
    print('Product:', json.dumps(product_data, indent=2))
    return product_data

if __name__ == '__main__':
    user = fetch_user()
    product = fetch_product()
```

## Flask Integration

```python
from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

@app.route('/user')
def get_user():
    response = requests.get('https://real-time-backend-preview.vercel.app/api/user')
    return jsonify(response.json())

@app.route('/product')
def get_product():
    response = requests.get('https://real-time-backend-preview.vercel.app/api/product')
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
```

## Django Integration

```python
import requests
from django.http import JsonResponse
from django.shortcuts import render

def user_view(request):
    response = requests.get('https://real-time-backend-preview.vercel.app/api/user')
    user_data = response.json()
    return JsonResponse(user_data)

def product_view(request):
    response = requests.get('https://real-time-backend-preview.vercel.app/api/product')
    product_data = response.json()
    return JsonResponse(product_data)
```# Python API Connection

This template demonstrates how to connect to the mock API using Python.

## API Endpoints

- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data
- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

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

response = requests.get('https://real-time-backend-preview.vercel.app/api/user')
user = response.json()
print('User:', user)
# In a web app, pass user to your template or update UI
```

Replace the mock API URL with your production API when ready.