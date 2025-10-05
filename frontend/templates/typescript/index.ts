interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  company: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

fetch('https://real-time-backend-preview.vercel.app/api/user')
  .then(response => response.json())
  .then((data: User) => console.log('User:', data))
  .catch((error: any) => console.error('Error fetching user:', error));

fetch('https://real-time-backend-preview.vercel.app/api/product')
  .then(response => response.json())
  .then((data: Product) => console.log('Product:', data))
  .catch((error: any) => console.error('Error fetching product:', error));