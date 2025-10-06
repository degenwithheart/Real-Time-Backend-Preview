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

  const { method, query } = req;
  const { endpoint } = query;

  try {
    // Generate fresh fake data on each request
    const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Mike', 'Emily', 'David', 'Lisa', 'Chris', 'Anna'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const companies = ['TechCorp', 'DataSoft', 'InnovateLab', 'FutureTech', 'CodeWorks', 'DigitalHub', 'SmartSys', 'WebFlow', 'CloudTech', 'DevStudio'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'email.com'];

    switch (endpoint) {
      case 'single':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
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
        break;

      case 'list':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const count = parseInt(query.count) || 10;
        const users = Array.from({ length: count }, () => {
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
          const company = companies[Math.floor(Math.random() * companies.length)];
          const domain = domains[Math.floor(Math.random() * domains.length)];

          return {
            id: Math.floor(Math.random() * 9999) + 1,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
            address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Cedar', 'Elm'][Math.floor(Math.random() * 5)]} St`,
            company: company,
            avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
            phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            createdAt: new Date().toISOString(),
          };
        });

        res.status(200).json({
          success: true,
          message: `${users.length} users retrieved successfully`,
          data: users,
          pagination: {
            page: 1,
            limit: count,
            total: count,
            totalPages: 1
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'profile':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const profileFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const profileLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const profileCompany = companies[Math.floor(Math.random() * companies.length)];
        const profileDomain = domains[Math.floor(Math.random() * domains.length)];

        const profile = {
          id: Math.floor(Math.random() * 9999) + 1,
          name: `${profileFirstName} ${profileLastName}`,
          email: `${profileFirstName.toLowerCase()}.${profileLastName.toLowerCase()}@${profileDomain}`,
          username: `${profileFirstName.toLowerCase()}${profileLastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
          bio: 'Passionate about technology and innovation. Always learning something new.',
          avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
          coverImage: `https://picsum.photos/800/300?random=${Math.random()}`,
          location: `${['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin'][Math.floor(Math.random() * 5)]}, ${['NY', 'CA', 'UK', 'Japan', 'Germany'][Math.floor(Math.random() * 5)]}`,
          website: `https://${profileFirstName.toLowerCase()}${profileLastName.toLowerCase()}.com`,
          company: profileCompany,
          position: ['Software Engineer', 'Product Manager', 'Designer', 'Data Scientist', 'DevOps Engineer'][Math.floor(Math.random() * 5)],
          phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          verified: Math.random() > 0.7,
          followers: Math.floor(Math.random() * 10000) + 100,
          following: Math.floor(Math.random() * 1000) + 50,
          posts: Math.floor(Math.random() * 500) + 10,
          joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
          lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        res.status(200).json({
          success: true,
          message: 'User profile retrieved successfully',
          data: profile,
          timestamp: new Date().toISOString(),
        });
        break;

      case 'search':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const searchTerm = query.q || '';
        const searchResults = firstNames
          .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, 5)
          .map(firstName => {
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const company = companies[Math.floor(Math.random() * companies.length)];
            const domain = domains[Math.floor(Math.random() * domains.length)];

            return {
              id: Math.floor(Math.random() * 9999) + 1,
              name: `${firstName} ${lastName}`,
              email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
              username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
              avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
              company: company,
              verified: Math.random() > 0.8,
            };
          });

        res.status(200).json({
          success: true,
          message: `Found ${searchResults.length} users matching "${searchTerm}"`,
          data: searchResults,
          search: {
            query: searchTerm,
            totalResults: searchResults.length
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'stats':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        res.status(200).json({
          success: true,
          message: 'User statistics retrieved successfully',
          data: {
            totalUsers: Math.floor(Math.random() * 100000) + 50000,
            activeUsers: Math.floor(Math.random() * 50000) + 25000,
            newUsersToday: Math.floor(Math.random() * 500) + 100,
            newUsersThisWeek: Math.floor(Math.random() * 2000) + 500,
            newUsersThisMonth: Math.floor(Math.random() * 8000) + 2000,
            verifiedUsers: Math.floor(Math.random() * 30000) + 15000,
            premiumUsers: Math.floor(Math.random() * 5000) + 1000,
            userRetention: {
              day1: (Math.random() * 20 + 80).toFixed(1),
              day7: (Math.random() * 30 + 60).toFixed(1),
              day30: (Math.random() * 40 + 40).toFixed(1),
            },
            topCountries: [
              { country: 'United States', users: Math.floor(Math.random() * 20000) + 10000 },
              { country: 'United Kingdom', users: Math.floor(Math.random() * 5000) + 2000 },
              { country: 'Germany', users: Math.floor(Math.random() * 4000) + 1500 },
              { country: 'France', users: Math.floor(Math.random() * 3000) + 1000 },
              { country: 'Canada', users: Math.floor(Math.random() * 2500) + 800 },
            ]
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'activity':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const userId = query.userId || Math.floor(Math.random() * 9999) + 1;
        const activities = Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () => ({
          id: Math.floor(Math.random() * 10000) + 1,
          userId: userId,
          type: ['login', 'profile_update', 'post_created', 'comment_added', 'like_given', 'follow_user', 'purchase_made'][Math.floor(Math.random() * 7)],
          description: 'User performed an action',
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          ipAddress: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        }));

        res.status(200).json({
          success: true,
          message: `Activity log for user ${userId} retrieved successfully`,
          data: activities,
          user: {
            id: userId,
            totalActivities: activities.length
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'preferences':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const prefUserId = query.userId || Math.floor(Math.random() * 9999) + 1;
        const preferences = {
          userId: prefUserId,
          notifications: {
            email: Math.random() > 0.2,
            push: Math.random() > 0.3,
            sms: Math.random() > 0.7,
            marketing: Math.random() > 0.5,
          },
          privacy: {
            profileVisibility: ['public', 'friends', 'private'][Math.floor(Math.random() * 3)],
            showOnlineStatus: Math.random() > 0.4,
            showLastSeen: Math.random() > 0.6,
            allowMessages: Math.random() > 0.1,
          },
          appearance: {
            theme: ['light', 'dark', 'auto'][Math.floor(Math.random() * 3)],
            language: ['en', 'es', 'fr', 'de', 'ja'][Math.floor(Math.random() * 5)],
            timezone: 'America/New_York',
            dateFormat: 'MM/DD/YYYY',
          },
          content: {
            showAdultContent: Math.random() > 0.8,
            autoplayVideos: Math.random() > 0.5,
            reduceMotion: Math.random() > 0.9,
            highContrast: Math.random() > 0.95,
          },
          updatedAt: new Date().toISOString(),
        };

        res.status(200).json({
          success: true,
          message: `Preferences for user ${prefUserId} retrieved successfully`,
          data: preferences,
          timestamp: new Date().toISOString(),
        });
        break;

      case 'followers':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const followersUserId = query.userId || Math.floor(Math.random() * 9999) + 1;
        const followersCount = parseInt(query.count) || 10;
        const followers = Array.from({ length: followersCount }, () => {
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

          return {
            id: Math.floor(Math.random() * 9999) + 1,
            name: `${firstName} ${lastName}`,
            username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
            avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
            followedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            mutual: Math.random() > 0.6,
          };
        });

        res.status(200).json({
          success: true,
          message: `Followers for user ${followersUserId} retrieved successfully`,
          data: followers,
          pagination: {
            page: 1,
            limit: followersCount,
            total: followersCount,
            totalPages: 1
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'following':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const followingUserId = query.userId || Math.floor(Math.random() * 9999) + 1;
        const followingCount = parseInt(query.count) || 10;
        const following = Array.from({ length: followingCount }, () => {
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

          return {
            id: Math.floor(Math.random() * 9999) + 1,
            name: `${firstName} ${lastName}`,
            username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
            avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
            followedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            mutual: Math.random() > 0.6,
          };
        });

        res.status(200).json({
          success: true,
          message: `Following list for user ${followingUserId} retrieved successfully`,
          data: following,
          pagination: {
            page: 1,
            limit: followingCount,
            total: followingCount,
            totalPages: 1
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'analytics':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const analyticsUserId = query.userId || Math.floor(Math.random() * 9999) + 1;
        const analytics = {
          userId: analyticsUserId,
          profileViews: Math.floor(Math.random() * 10000) + 1000,
          profileViewsChange: (Math.random() * 50 - 25).toFixed(1),
          followersGained: Math.floor(Math.random() * 500) + 50,
          followersLost: Math.floor(Math.random() * 50),
          postsCreated: Math.floor(Math.random() * 100) + 10,
          engagement: {
            likesReceived: Math.floor(Math.random() * 2000) + 200,
            commentsReceived: Math.floor(Math.random() * 500) + 50,
            sharesReceived: Math.floor(Math.random() * 200) + 20,
            averageEngagement: (Math.random() * 5 + 2).toFixed(1),
          },
          topContent: [
            { type: 'post', id: 1, engagement: Math.floor(Math.random() * 500) + 100 },
            { type: 'post', id: 2, engagement: Math.floor(Math.random() * 400) + 80 },
            { type: 'post', id: 3, engagement: Math.floor(Math.random() * 300) + 60 },
          ],
          demographics: {
            ageGroups: {
              '18-24': Math.floor(Math.random() * 30) + 10,
              '25-34': Math.floor(Math.random() * 40) + 20,
              '35-44': Math.floor(Math.random() * 30) + 15,
              '45+': Math.floor(Math.random() * 20) + 5,
            },
            topLocations: [
              { location: 'New York, NY', percentage: Math.floor(Math.random() * 20) + 10 },
              { location: 'Los Angeles, CA', percentage: Math.floor(Math.random() * 15) + 8 },
              { location: 'Chicago, IL', percentage: Math.floor(Math.random() * 12) + 6 },
            ]
          },
          period: 'last_30_days',
          updatedAt: new Date().toISOString(),
        };

        res.status(200).json({
          success: true,
          message: `Analytics for user ${analyticsUserId} retrieved successfully`,
          data: analytics,
          timestamp: new Date().toISOString(),
        });
        break;

      default:
        // Original user endpoint for backward compatibility
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const defaultFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const defaultLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const defaultCompany = companies[Math.floor(Math.random() * companies.length)];
        const defaultDomain = domains[Math.floor(Math.random() * domains.length)];

        const defaultUser = {
          id: Math.floor(Math.random() * 9999) + 1,
          name: `${defaultFirstName} ${defaultLastName}`,
          email: `${defaultFirstName.toLowerCase()}.${defaultLastName.toLowerCase()}@${defaultDomain}`,
          address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Cedar', 'Elm'][Math.floor(Math.random() * 5)]} St`,
          company: defaultCompany,
          avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
          phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          createdAt: new Date().toISOString(),
        };

        res.status(200).json({
          success: true,
          message: 'User data retrieved successfully',
          data: defaultUser,
          timestamp: new Date().toISOString(),
        });
    }
  } catch (error) {
    console.error('User API Error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Internal server error' },
      timestamp: new Date().toISOString(),
    });
  }
};