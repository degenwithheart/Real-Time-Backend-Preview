fetch('https://real-time-backend-preview.vercel.app/api/user')
  .then(response => response.json())
  .then(data => console.log('User:', data))
  .catch(error => console.error('Error:', error));