export default function handler(req: { method?: string }, res: { setHeader: (key: string, value: string) => void; status: (code: number) => { end: () => void; json: (data: unknown) => void } }) {
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
      message: 'API is healthy',
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
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
}
