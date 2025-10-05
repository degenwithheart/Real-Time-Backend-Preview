interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

fetch('https://real-time-backend-preview.vercel.app/api/product')
  .then(response => response.json())
  .then((data: Product) => console.log('Product:', data))
  .catch((error: unknown) => console.error('Error:', error));