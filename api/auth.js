import { faker } from '@faker-js/faker';
import {
  getUserProfile,
  getUserOrders,
  getUserPosts,
  getUserDevices,
  getUserAccounts
} from '../shared-data.js';

// Generate realistic JWT token structure
function generateJWT() {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({
    sub: faker.string.uuid(),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['user', 'admin', 'moderator'])
  })).toString('base64');
  const signature = faker.string.alphanumeric(43);
  return `${header}.${payload}.${signature}`;
}

// Generate user profile data
function generateUserProfile() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    avatar: faker.image.avatar(),
    bio: faker.lorem.paragraph(),
    location: {
      city: faker.location.city(),
      country: faker.location.country(),
      timezone: faker.location.timeZone()
    },
    preferences: {
      language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de', 'ja', 'zh']),
      theme: faker.helpers.arrayElement(['light', 'dark', 'auto']),
      notifications: {
        email: faker.datatype.boolean(),
        push: faker.datatype.boolean(),
        sms: faker.datatype.boolean()
      }
    },
    socialLinks: {
      twitter: faker.internet.url(),
      github: faker.internet.url(),
      linkedin: faker.internet.url(),
      website: faker.internet.url()
    },
    stats: {
      loginCount: faker.number.int({ min: 1, max: 1000 }),
      lastLogin: faker.date.recent(),
      accountCreated: faker.date.past(),
      profileViews: faker.number.int({ min: 0, max: 5000 })
    },
    verified: faker.datatype.boolean(),
    twoFactorEnabled: faker.datatype.boolean(),
    role: faker.helpers.arrayElement(['user', 'premium', 'admin', 'moderator']),
    status: faker.helpers.arrayElement(['active', 'inactive', 'suspended', 'pending'])
  };
}

// Generate permission data
function generatePermissions() {
  const permissions = [
    'read:users', 'write:users', 'delete:users',
    'read:products', 'write:products', 'delete:products',
    'read:orders', 'write:orders', 'delete:orders',
    'read:analytics', 'write:analytics',
    'admin:panel', 'admin:users', 'admin:system',
    'moderate:content', 'moderate:users',
    'create:posts', 'edit:posts', 'delete:posts',
    'upload:media', 'manage:categories'
  ];
  
  return {
    userId: faker.string.uuid(),
    role: faker.helpers.arrayElement(['user', 'admin', 'moderator', 'editor']),
    permissions: faker.helpers.arrayElements(permissions, { min: 3, max: 10 }),
    scopes: faker.helpers.arrayElements(['read', 'write', 'delete', 'admin'], { min: 1, max: 4 }),
    resourceAccess: {
      users: faker.helpers.arrayElement(['none', 'read', 'write', 'admin']),
      products: faker.helpers.arrayElement(['none', 'read', 'write', 'admin']),
      orders: faker.helpers.arrayElement(['none', 'read', 'write', 'admin']),
      analytics: faker.helpers.arrayElement(['none', 'read', 'write', 'admin'])
    },
    restrictions: {
      ipWhitelist: faker.helpers.multiple(() => faker.internet.ip(), { count: { min: 0, max: 3 } }),
      timeRestrictions: {
        startTime: faker.date.recent(),
        endTime: faker.date.future(),
        timezone: faker.location.timeZone()
      },
      rateLimit: {
        requests: faker.number.int({ min: 100, max: 10000 }),
        period: faker.helpers.arrayElement(['minute', 'hour', 'day'])
      }
    },
    lastUpdated: faker.date.recent(),
    createdAt: faker.date.past()
  };
}

export default function handler(req, res) {
  const { method, query } = req;
  const { endpoint } = query;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (endpoint) {
      case 'login':
        if (method === 'POST') {
          const loginData = {
            success: true,
            message: 'Login successful',
            token: generateJWT(),
            refreshToken: faker.string.alphanumeric(64),
            user: generateUserProfile(),
            expiresIn: 3600,
            tokenType: 'Bearer'
          };
          res.status(200).json(loginData);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'register':
        if (method === 'POST') {
          const registerData = {
            success: true,
            message: 'Registration successful',
            user: generateUserProfile(),
            token: generateJWT(),
            verificationRequired: faker.datatype.boolean()
          };
          res.status(201).json(registerData);
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'profile':
        if (method === 'GET') {
          res.status(200).json(generateUserProfile());
        } else if (method === 'PUT') {
          res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: generateUserProfile()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'permissions':
        if (method === 'GET') {
          const count = parseInt(query.count) || 20;
          const permissions = Array.from({ length: count }, () => generatePermissions());
          
          res.status(200).json({
            data: permissions,
            meta: {
              total: count,
              page: parseInt(query.page) || 1,
              per_page: count,
              has_more: faker.datatype.boolean()
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'logout':
        if (method === 'POST') {
          res.status(200).json({
            success: true,
            message: 'Logged out successfully'
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'refresh':
        if (method === 'POST') {
          res.status(200).json({
            success: true,
            token: generateJWT(),
            refreshToken: faker.string.alphanumeric(64),
            expiresIn: 3600
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'verify':
        if (method === 'POST') {
          res.status(200).json({
            success: true,
            message: 'Email verified successfully',
            verified: true
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'reset-password':
        if (method === 'POST') {
          res.status(200).json({
            success: true,
            message: 'Password reset link sent to email'
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'user-profile':
        if (method === 'GET') {
          const userId = query.userId || faker.string.uuid();
          const profile = getUserProfile(userId);

          if (!profile) {
            res.status(404).json({ error: 'User not found' });
            return;
          }

          res.status(200).json({
            data: profile,
            meta: {
              relationships: {
                hasCustomerProfile: !!profile.customerProfile,
                hasEmployeeProfile: !!profile.employeeProfile,
                hasPatientProfile: !!profile.patientProfile,
                hasPlayerProfile: !!profile.playerProfile,
                ordersCount: profile.orders.length,
                postsCount: profile.posts.length,
                devicesCount: profile.devices.length,
                accountsCount: profile.accounts.length
              }
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'user-activity':
        if (method === 'GET') {
          const userId = query.userId || faker.string.uuid();
          const orders = getUserOrders(userId);
          const posts = getUserPosts(userId);
          const devices = getUserDevices(userId);
          const accounts = getUserAccounts(userId);

          res.status(200).json({
            data: {
              userId,
              recentOrders: orders.slice(0, 5),
              recentPosts: posts.slice(0, 5),
              activeDevices: devices.filter(d => d.status.online),
              accountSummary: accounts.map(acc => ({
                id: acc.id,
                type: acc.type,
                balance: acc.balance.current
              }))
            },
            meta: {
              totalOrders: orders.length,
              totalPosts: posts.length,
              totalDevices: devices.length,
              totalAccounts: accounts.length,
              activeDevices: devices.filter(d => d.status.online).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      default:
        res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}