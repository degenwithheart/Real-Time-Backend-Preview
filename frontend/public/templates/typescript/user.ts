interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  company: string;
}

fetch('https://real-time-backend-preview.vercel.app/api/user')
  .then(response => response.json())
  .then((data: User) => console.log('User:', data))
  .catch((error: unknown) => console.error('Error:', error));