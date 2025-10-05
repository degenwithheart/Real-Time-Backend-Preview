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
    // Simple response without faker for testing
    const user = {
      id: Math.floor(Math.random() * 9999) + 1,
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      company: 'Example Corp',
      avatar: 'https://via.placeholder.com/150',
      phone: '+1-555-0123',
      createdAt: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      message: 'User data retrieved successfully',
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('User API Error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Internal server error' },
      timestamp: new Date().toISOString(),
    });
  }
}