import requests

try:
    response = requests.get('http://localhost:3001/api/product')
    response.raise_for_status()
    product = response.json()
    print('Product:', product)
except requests.exceptions.RequestException as e:
    print('Error:', e)