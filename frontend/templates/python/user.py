import requests

try:
    response = requests.get('https://real-time-backend-preview.vercel.app/api/user')
    response.raise_for_status()
    user = response.json()
    print('User:', user)
except requests.exceptions.RequestException as e:
    print('Error:', e)