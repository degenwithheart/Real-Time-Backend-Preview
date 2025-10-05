import requests

try:
    response = requests.get('http://localhost:3001/api/user')
    response.raise_for_status()
    user = response.json()
    print('User:', user)
except requests.exceptions.RequestException as e:
    print('Error:', e)