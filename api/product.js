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
    const { category, minPrice = 5, maxPrice = 500 } = req.query;

    const product = {
      id: faker.number.int({ min: 100, max: 999 }),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: parseFloat(minPrice), max: parseFloat(maxPrice) })),
      description: faker.commerce.productDescription(),
      category: category || faker.commerce.department(),
      image: faker.image.url(),
      inStock: faker.datatype.boolean(),
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      createdAt: faker.date.past(),
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