fetch('https://real-time-backend-preview.vercel.app/api/user')
  .then(response => response.json())
  .then(data => console.log('User:', data))
  .catch(error => console.error('Error fetching user:', error));

fetch('https://real-time-backend-preview.vercel.app/api/product')
  .then(response => response.json())
  .then(data => console.log('Product:', data))
  .catch(error => console.error('Error fetching product:', error));