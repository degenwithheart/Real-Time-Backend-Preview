import requests

try:
    user_response = requests.get('http://localhost:3001/api/user')
    user_response.raise_for_status()
    user = user_response.json()
    print('User:', user)

    product_response = requests.get('http://localhost:3001/api/product')
    product_response.raise_for_status()
    product = product_response.json()
    print('Product:', product)
except requests.exceptions.RequestException as e:
    print('Error:', e)