# TypeScript API Template

This template demonstrates how to connect to the mock API using TypeScript.

## API Endpoints

- `GET http://localhost:3001/api/user` - Returns random user data
- `GET http://localhost:3001/api/product` - Returns random product data

## Prerequisites

Ensure the backend is running:

```bash
cd ../../backend
npm install
npm start
```

Install ts-node globally: `npm install -g ts-node`

## Usage

Run the examples:

```bash
ts-node user.ts
ts-node product.ts
```

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data with TypeScript types.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  company: string;
}

fetch('http://localhost:3001/api/user')
  .then(response => response.json())
  .then((data: User) => {
    // Update your UI with the data
    console.log('User:', data);
  })
  .catch((error: any) => console.error('Error:', error));
```

Replace the mock API URL with your production API when ready.