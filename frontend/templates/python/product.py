import requests

try:
    response = requests.get('https://real-time-backend-preview.vercel.app/api/product')
    response.raise_for_status()
    product = response.json()
    print('Product:', product)
except requests.exceptions.RequestException as e:
    print('Error:', e)