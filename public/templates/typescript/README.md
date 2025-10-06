# TypeScript API Integration

## API Endpoints
- GET /api/user - Returns random user data
- GET /api/product - Returns random product data

Base URL: https://real-time-backend-preview.vercel.app

## Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  avatar: string;
  createdAt: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  rating: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}
```

## Basic Usage

```typescript
// Fetch user data
async function fetchUser(): Promise<ApiResponse<User>> {
  const response = await fetch('https://real-time-backend-preview.vercel.app/api/user');
  const userData: ApiResponse<User> = await response.json();
  console.log('User:', userData);
  return userData;
}

// Fetch product data
async function fetchProduct(): Promise<ApiResponse<Product>> {
  const response = await fetch('https://real-time-backend-preview.vercel.app/api/product');
  const productData: ApiResponse<Product> = await response.json();
  console.log('Product:', productData);
  return productData;
}
```

## React + TypeScript

```tsx
import React, { useState, useEffect } from 'react';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser()
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Company: {user.company}</p>
    </div>
  );
};

export default UserProfile;
```