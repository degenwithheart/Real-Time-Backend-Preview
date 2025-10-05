module.exports = (req, res) => {
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
    res.status(200).json({
      success: true,
      message: 'API is healthy and running',
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        endpoints: [
          '/api/health',
          '/api/user', 
          '/api/product'
        ]
      },
    });
  } catch (error) {
    console.error('Health API Error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Internal server error' },
      timestamp: new Date().toISOString(),
    });
  }
};