fetch('http://localhost:3001/api/user')
  .then(response => response.json())
  .then(data => console.log('User:', data))
  .catch(error => console.error('Error:', error));