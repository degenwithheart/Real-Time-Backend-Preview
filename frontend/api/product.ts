export default function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: { message: 'Method not allowed' },
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const product = {
      id: Math.floor(Math.random() * 900) + 100,
      name: 'Sample Product',
      price: Math.floor(Math.random() * 500) + 5,
      description: 'A sample product description',
      category: 'Electronics',
      image: 'https://via.placeholder.com/300x200',
      inStock: true,
      rating: (Math.random() * 4 + 1).toFixed(1),
      createdAt: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      message: 'Product data retrieved successfully',
      data: product,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Product API Error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Internal server error' },
      timestamp: new Date().toISOString(),
    });
  }
}
