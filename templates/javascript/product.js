fetch('http://localhost:3001/api/product')
  .then(response => response.json())
  .then(data => console.log('Product:', data))
  .catch(error => console.error('Error:', error));