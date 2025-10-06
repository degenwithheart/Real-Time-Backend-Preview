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

    switch (endpoint) {
      case 'single':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
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
        const products = Array.from({ length: count }, () => {
          const name = productNames[Math.floor(Math.random() * productNames.length)];
          const category = categories[Math.floor(Math.random() * categories.length)];
          const description = descriptions[Math.floor(Math.random() * descriptions.length)];

          return {
            id: Math.floor(Math.random() * 900) + 100,
            name: name,
            price: Math.floor(Math.random() * 500) + 5,
            description: description,
            category: category,
            image: `https://picsum.photos/300/200?random=${Math.random()}`,
            inStock: Math.random() > 0.2,
            rating: (Math.random() * 4 + 1).toFixed(1),
            createdAt: new Date().toISOString(),
          };
        });

        res.status(200).json({
          success: true,
          message: `${products.length} products retrieved successfully`,
          data: products,
          pagination: {
            page: 1,
            limit: count,
            total: count,
            totalPages: 1
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'categories':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        res.status(200).json({
          success: true,
          message: 'Product categories retrieved successfully',
          data: categories.map((cat, index) => ({
            id: index + 1,
            name: cat,
            slug: cat.toLowerCase().replace(/\s+/g, '-'),
            productCount: Math.floor(Math.random() * 50) + 10,
            image: `https://picsum.photos/200/200?random=${index}`
          })),
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
        const filteredProducts = productNames
          .filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
          .slice(0, 5)
          .map(name => {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const description = descriptions[Math.floor(Math.random() * descriptions.length)];

            return {
              id: Math.floor(Math.random() * 900) + 100,
              name: name,
              price: Math.floor(Math.random() * 500) + 5,
              description: description,
              category: category,
              image: `https://picsum.photos/300/200?random=${Math.random()}`,
              inStock: Math.random() > 0.2,
              rating: (Math.random() * 4 + 1).toFixed(1),
              createdAt: new Date().toISOString(),
            };
          });

        res.status(200).json({
          success: true,
          message: `Found ${filteredProducts.length} products matching "${searchTerm}"`,
          data: filteredProducts,
          search: {
            query: searchTerm,
            totalResults: filteredProducts.length
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'featured':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const featuredCount = parseInt(query.count) || 6;
        const featuredProducts = Array.from({ length: featuredCount }, () => {
          const name = productNames[Math.floor(Math.random() * productNames.length)];
          const category = categories[Math.floor(Math.random() * categories.length)];
          const description = descriptions[Math.floor(Math.random() * descriptions.length)];

          return {
            id: Math.floor(Math.random() * 900) + 100,
            name: name,
            price: Math.floor(Math.random() * 500) + 5,
            description: description,
            category: category,
            image: `https://picsum.photos/300/200?random=${Math.random()}`,
            inStock: true,
            rating: (Math.random() * 2 + 3).toFixed(1), // Higher rating for featured
            featured: true,
            createdAt: new Date().toISOString(),
          };
        });

        res.status(200).json({
          success: true,
          message: 'Featured products retrieved successfully',
          data: featuredProducts,
          timestamp: new Date().toISOString(),
        });
        break;

      case 'reviews':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const productId = query.productId || Math.floor(Math.random() * 900) + 100;
        const reviews = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => ({
          id: Math.floor(Math.random() * 1000) + 1,
          productId: productId,
          userId: Math.floor(Math.random() * 1000) + 1,
          userName: `User ${Math.floor(Math.random() * 1000) + 1}`,
          rating: Math.floor(Math.random() * 5) + 1,
          title: ['Great product!', 'Good value', 'Excellent quality', 'Highly recommended', 'Worth it'][Math.floor(Math.random() * 5)],
          comment: 'This product exceeded my expectations. Great quality and fast shipping.',
          verified: Math.random() > 0.3,
          helpful: Math.floor(Math.random() * 50),
          createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        }));

        res.status(200).json({
          success: true,
          message: `Reviews for product ${productId} retrieved successfully`,
          data: reviews,
          summary: {
            averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
            totalReviews: reviews.length,
            ratingDistribution: {
              5: reviews.filter(r => r.rating === 5).length,
              4: reviews.filter(r => r.rating === 4).length,
              3: reviews.filter(r => r.rating === 3).length,
              2: reviews.filter(r => r.rating === 2).length,
              1: reviews.filter(r => r.rating === 1).length,
            }
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'inventory':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const inventoryProducts = Array.from({ length: 20 }, () => {
          const name = productNames[Math.floor(Math.random() * productNames.length)];
          const category = categories[Math.floor(Math.random() * categories.length)];

          return {
            id: Math.floor(Math.random() * 900) + 100,
            name: name,
            category: category,
            stock: Math.floor(Math.random() * 100) + 1,
            reserved: Math.floor(Math.random() * 10),
            available: Math.floor(Math.random() * 90) + 1,
            lowStock: Math.random() > 0.8,
            lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          };
        });

        res.status(200).json({
          success: true,
          message: 'Product inventory retrieved successfully',
          data: inventoryProducts,
          summary: {
            totalProducts: inventoryProducts.length,
            lowStockItems: inventoryProducts.filter(p => p.lowStock).length,
            outOfStockItems: inventoryProducts.filter(p => p.available === 0).length,
            totalStock: inventoryProducts.reduce((sum, p) => sum + p.stock, 0)
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'recommendations':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const userId = query.userId || Math.floor(Math.random() * 1000) + 1;
        const recommendedProducts = Array.from({ length: 8 }, () => {
          const name = productNames[Math.floor(Math.random() * productNames.length)];
          const category = categories[Math.floor(Math.random() * categories.length)];
          const description = descriptions[Math.floor(Math.random() * descriptions.length)];

          return {
            id: Math.floor(Math.random() * 900) + 100,
            name: name,
            price: Math.floor(Math.random() * 500) + 5,
            description: description,
            category: category,
            image: `https://picsum.photos/300/200?random=${Math.random()}`,
            inStock: Math.random() > 0.1,
            rating: (Math.random() * 4 + 1).toFixed(1),
            recommendationScore: (Math.random() * 0.5 + 0.5).toFixed(2),
            createdAt: new Date().toISOString(),
          };
        });

        res.status(200).json({
          success: true,
          message: `Product recommendations for user ${userId} retrieved successfully`,
          data: recommendedProducts,
          user: {
            id: userId,
            preferences: ['electronics', 'gaming', 'office'][Math.floor(Math.random() * 3)]
          },
          timestamp: new Date().toISOString(),
        });
        break;

      case 'trending':
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const trendingProducts = Array.from({ length: 12 }, () => {
          const name = productNames[Math.floor(Math.random() * productNames.length)];
          const category = categories[Math.floor(Math.random() * categories.length)];
          const description = descriptions[Math.floor(Math.random() * descriptions.length)];

          return {
            id: Math.floor(Math.random() * 900) + 100,
            name: name,
            price: Math.floor(Math.random() * 500) + 5,
            description: description,
            category: category,
            image: `https://picsum.photos/300/200?random=${Math.random()}`,
            inStock: Math.random() > 0.1,
            rating: (Math.random() * 4 + 1).toFixed(1),
            trending: true,
            trendScore: Math.floor(Math.random() * 100) + 1,
            salesVelocity: Math.floor(Math.random() * 50) + 1,
            createdAt: new Date().toISOString(),
          };
        }).sort((a, b) => b.trendScore - a.trendScore);

        res.status(200).json({
          success: true,
          message: 'Trending products retrieved successfully',
          data: trendingProducts,
          period: 'last_7_days',
          timestamp: new Date().toISOString(),
        });
        break;

      default:
        // Original product endpoint for backward compatibility
        if (method !== 'GET') {
          return res.status(405).json({
            success: false,
            error: { message: 'Method not allowed' },
            timestamp: new Date().toISOString(),
          });
        }
        const defaultName = productNames[Math.floor(Math.random() * productNames.length)];
        const defaultCategory = categories[Math.floor(Math.random() * categories.length)];
        const defaultDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

        const defaultProduct = {
          id: Math.floor(Math.random() * 900) + 100,
          name: defaultName,
          price: Math.floor(Math.random() * 500) + 5,
          description: defaultDescription,
          category: defaultCategory,
          image: `https://picsum.photos/300/200?random=${Math.random()}`,
          inStock: Math.random() > 0.2,
          rating: (Math.random() * 4 + 1).toFixed(1),
          createdAt: new Date().toISOString(),
        };

        res.status(200).json({
          success: true,
          message: 'Product data retrieved successfully',
          data: defaultProduct,
          timestamp: new Date().toISOString(),
        });
    }
  } catch (error) {
    console.error('Product API Error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Internal server error' },
      timestamp: new Date().toISOString(),
    });
  }
};