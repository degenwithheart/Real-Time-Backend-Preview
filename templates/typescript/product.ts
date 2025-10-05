interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

fetch('http://localhost:3001/api/product')
  .then(response => response.json())
  .then((data: Product) => console.log('Product:', data))
  .catch((error: any) => console.error('Error:', error));