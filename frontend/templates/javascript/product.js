fetch('https://real-time-backend-preview.vercel.app/api/product')
  .then(response => response.json())
  .then(data => console.log('Product:', data))
  .catch(error => console.error('Error:', error));