fetch('http://localhost:3001/api/user')
  .then(response => response.json())
  .then(data => console.log('User:', data))
  .catch(error => console.error('Error fetching user:', error));

fetch('http://localhost:3001/api/product')
  .then(response => response.json())
  .then(data => console.log('Product:', data))
  .catch(error => console.error('Error fetching product:', error));