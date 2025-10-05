import { faker } from '@faker-js/faker';

export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: { message: 'Method not allowed' },
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const { locale = 'en' } = req.query;

    // Set faker locale
    faker.locale = locale;

    const user = {
      id: faker.number.int({ min: 1, max: 9999 }),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      company: faker.company.name(),
      avatar: faker.image.avatar(),
      phone: faker.phone.number(),
      createdAt: faker.date.past(),
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