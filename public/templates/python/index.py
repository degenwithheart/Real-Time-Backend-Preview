import requests

try:
    user_response = requests.get('https://real-time-backend-preview.vercel.app/api/user')
    user_response.raise_for_status()
    user = user_response.json()
    print('User:', user)

    product_response = requests.get('https://real-time-backend-preview.vercel.app/api/product')
    product_response.raise_for_status()
    product = product_response.json()
    print('Product:', product)
except requests.exceptions.RequestException as e:
    print('Error:', e)