# JavaScript API Template

This template demonstrates how to connect to the mock API using JavaScript.

## API Endpoints

- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data
- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

## Prerequisites

Ensure the backend is running:

```bash
cd ../../backend
npm install
npm start
```

## Usage

Run the examples:

```bash
node user.js
node product.js
```

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data in a web page.

```html
<!DOCTYPE html>
<html>
<head>
  <title>User Data</title>
</head>
<body>
  <h1>User Info</h1>
  <div id="user"></div>
  <script>
    fetch('https://real-time-backend-preview.vercel.app/api/user')
      .then(response => response.json())
      .then(data => {
        document.getElementById('user').innerHTML = `
          <p>Name: ${data.name}</p>
          <p>Email: ${data.email}</p>
          <p>Address: ${data.address}</p>
          <p>Company: ${data.company}</p>
        `;
      })
      .catch(error => console.error('Error:', error));
  </script>
</body>
</html>
```

Replace the mock API URL with your production API when ready.