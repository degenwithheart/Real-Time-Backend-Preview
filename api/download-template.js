export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
    });
  }

  try {
    const { template } = req.query;
    
    if (!template) {
      return res.status(400).json({
        success: false,
        error: { message: 'Template parameter is required' }
      });
    }

    // Validate template name
    const validTemplates = [
      'javascript', 'typescript', 'python', 'java', 'csharp', 
      'go', 'php', 'ruby', 'rust', 'kotlin'
    ];
    
    if (!validTemplates.includes(template.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid template name' }
      });
    }

    // For now, redirect to GitHub ZIP download as a fallback
    // In a real implementation, you would:
    // 1. Read the template files from the filesystem
    // 2. Create a ZIP archive
    // 3. Stream it back to the client
    
    const githubZipUrl = `https://github.com/degenwithheart/Real-Time-Backend-Preview/archive/refs/heads/main.zip`;
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      message: 'Redirecting to template download',
      downloadUrl: githubZipUrl,
      templateName: template
    });

  } catch (error) {
    console.error('Download Template API Error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Internal server error' },
    });
  }
}