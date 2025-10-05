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
    const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Mike', 'Emily', 'David', 'Lisa', 'Chris', 'Anna'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const companies = ['TechCorp', 'DataSoft', 'InnovateLab', 'FutureTech', 'CodeWorks', 'DigitalHub', 'SmartSys', 'WebFlow', 'CloudTech', 'DevStudio'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'email.com'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    const user = {
      id: Math.floor(Math.random() * 9999) + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Cedar', 'Elm'][Math.floor(Math.random() * 5)]} St`,
      company: company,
      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
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
};