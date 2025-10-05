export default function handler(req, res) {
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
    // Generate fresh fake data on each request
    const productNames = [
      'Wireless Headphones', 'Smart Watch', 'Laptop Stand', 'USB-C Hub', 'Bluetooth Speaker',
      'Gaming Mouse', 'Mechanical Keyboard', 'Phone Case', 'Wireless Charger', 'Tablet Holder',
      'LED Monitor', 'Webcam', 'Microphone', 'Power Bank', 'Cable Organizer'
    ];
    const categories = ['Electronics', 'Accessories', 'Gaming', 'Office', 'Mobile', 'Audio', 'Computing'];
    const descriptions = [
      'High-quality product with premium features',
      'Innovative design meets functionality',
      'Perfect for everyday use and professional work',
      'Durable construction with modern aesthetics',
      'Enhanced performance with user-friendly interface'
    ];
    
    const name = productNames[Math.floor(Math.random() * productNames.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    const product = {
      id: Math.floor(Math.random() * 900) + 100,
      name: name,
      price: Math.floor(Math.random() * 500) + 5,
      description: description,
      category: category,
      image: `https://picsum.photos/300/200?random=${Math.random()}`,
      inStock: Math.random() > 0.2, // 80% chance of being in stock
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
};