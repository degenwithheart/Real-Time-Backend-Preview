# JavaScript API Integration# JavaScript API Connection



## API EndpointsThis template demonstrates how to connect to the mock API using JavaScript.

- GET /api/user - Returns random user data

- GET /api/product - Returns random product data## API Endpoints



Base URL: https://real-time-backend-preview.vercel.app- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data

- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

## Basic Usage

## Usage

```javascript

// Fetch user dataRun the examples:

async function fetchUser() {

  const response = await fetch('https://real-time-backend-preview.vercel.app/api/user');```bash

  const userData = await response.json();node user.js

  console.log('User:', userData);node product.js

  return userData;```

}

## Building Frontend Apps

// Fetch product data  

async function fetchProduct() {Use this mock API to prototype your frontend while the real backend is being developed.

  const response = await fetch('https://real-time-backend-preview.vercel.app/api/product');

  const productData = await response.json();Example: Fetch and display user data in a web page.

  console.log('Product:', productData);

  return productData;```html

}<!DOCTYPE html>

```<html>

<head>

## HTML Example  <title>User Data</title>

</head>

```html<body>

<!DOCTYPE html>  <h1>User Info</h1>

<html>  <div id="user"></div>

<head>  <script>

  <title>API Demo</title>    fetch('https://real-time-backend-preview.vercel.app/api/user')

</head>      .then(response => response.json())

<body>      .then(data => {

  <button onclick="loadUser()">Load User</button>        document.getElementById('user').innerHTML = `

  <div id="result"></div>          <p>Name: ${data.name}</p>

          <p>Email: ${data.email}</p>

  <script>          <p>Address: ${data.address}</p>

    async function loadUser() {          <p>Company: ${data.company}</p>

      try {        `;

        const response = await fetch('https://real-time-backend-preview.vercel.app/api/user');      })

        const user = await response.json();      .catch(error => console.error('Error:', error));

          </script>

        document.getElementById('result').innerHTML = `</body>

          <h3>User Info</h3></html>

          <p>Name: ${user.data.name}</p>```

          <p>Email: ${user.data.email}</p>

          <p>Company: ${user.data.company}</p>Replace the mock API URL with your production API when ready.
        `;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  </script>
</body>
</html>
```

## React Integration

```jsx
import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://real-time-backend-preview.vercel.app/api/user')
      .then(res => res.json())
      .then(data => setUser(data.data));
  }, []);

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : <div>Loading...</div>;
}
```