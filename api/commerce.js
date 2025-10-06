import { faker } from '@faker-js/faker';
import {
  getRandomCustomer,
  getRandomProduct,
  getRandomOrder,
  getCustomerOrders,
  getOrderDetails,
  getUserProfile
} from '../shared-data.js';

// Generate order data with cross-API relationships
function generateOrder() {
  const customer = getRandomCustomer();
  const items = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
    const product = getRandomProduct();
    return {
      id: faker.string.uuid(),
      productId: product.id,
      name: product.name,
      sku: faker.string.alphanumeric(10).toUpperCase(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: product.price,
      discount: faker.number.float({ min: 0, max: 0.3, fractionDigits: 2 }),
      image: faker.image.url(),
      category: product.category,
      product: product // Include full product details
    };
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity * (1 - item.discount)), 0);
  const tax = subtotal * 0.08;
  const shipping = faker.number.float({ min: 0, max: 25, fractionDigits: 2 });
  const total = subtotal + tax + shipping;

  return {
    id: faker.string.uuid(),
    orderNumber: faker.string.alphanumeric(8).toUpperCase(),
    customerId: customer.id,
    userId: customer.userId, // Cross-API relationship
    customerInfo: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number()
    },
    customer: customer, // Include full customer details
    items,
    pricing: {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping: shipping,
      discount: faker.number.float({ min: 0, max: 50, fractionDigits: 2 }),
      total: parseFloat(total.toFixed(2))
    },
    status: faker.helpers.arrayElement(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
    paymentStatus: faker.helpers.arrayElement(['pending', 'paid', 'failed', 'refunded', 'partial']),
    paymentMethod: faker.helpers.arrayElement(['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery', 'cryptocurrency']),
    shippingAddress: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country()
    },
    billingAddress: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country()
    },
    tracking: {
      carrier: faker.helpers.arrayElement(['FedEx', 'UPS', 'DHL', 'USPS', 'Amazon']),
      trackingNumber: faker.string.alphanumeric(12).toUpperCase(),
      estimatedDelivery: faker.date.future(),
      currentLocation: faker.location.city()
    },
    notes: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    estimatedDelivery: faker.date.future()
  };
}

// Generate inventory item
function generateInventoryItem() {
  const stock = faker.number.int({ min: 0, max: 1000 });
  const reserved = faker.number.int({ min: 0, max: Math.floor(stock * 0.3) });
  
  return {
    id: faker.string.uuid(),
    sku: faker.string.alphanumeric(10).toUpperCase(),
    name: faker.commerce.productName(),
    category: faker.commerce.department(),
    brand: faker.company.name(),
    description: faker.commerce.productDescription(),
    stock: {
      available: stock - reserved,
      reserved: reserved,
      total: stock,
      reorderPoint: faker.number.int({ min: 10, max: 50 }),
      reorderQuantity: faker.number.int({ min: 100, max: 500 })
    },
    pricing: {
      cost: parseFloat(faker.commerce.price({ min: 10, max: 200 })),
      wholesale: parseFloat(faker.commerce.price({ min: 50, max: 300 })),
      retail: parseFloat(faker.commerce.price({ min: 100, max: 500 })),
      msrp: parseFloat(faker.commerce.price({ min: 150, max: 600 }))
    },
    supplier: {
      id: faker.string.uuid(),
      name: faker.company.name(),
      contact: faker.internet.email(),
      leadTime: faker.number.int({ min: 1, max: 30 })
    },
    warehouse: {
      location: faker.location.city(),
      section: faker.string.alpha(2).toUpperCase(),
      shelf: faker.number.int({ min: 1, max: 100 }),
      bin: faker.number.int({ min: 1, max: 50 })
    },
    dimensions: {
      length: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
      width: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
      height: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
      weight: faker.number.float({ min: 0.1, max: 50, fractionDigits: 2 })
    },
    status: faker.helpers.arrayElement(['active', 'discontinued', 'out_of_stock', 'backorder']),
    lastRestocked: faker.date.recent(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate transaction data
function generateTransaction() {
  const amount = faker.number.float({ min: 1, max: 10000, fractionDigits: 2 });
  
  return {
    id: faker.string.uuid(),
    transactionId: faker.string.alphanumeric(16).toUpperCase(),
    orderId: faker.string.uuid(),
    customerId: faker.string.uuid(),
    amount: amount,
    currency: faker.finance.currencyCode(),
    type: faker.helpers.arrayElement(['payment', 'refund', 'chargeback', 'adjustment']),
    status: faker.helpers.arrayElement(['pending', 'completed', 'failed', 'cancelled', 'disputed']),
    paymentMethod: {
      type: faker.helpers.arrayElement(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto', 'apple_pay', 'google_pay']),
      last4: faker.finance.creditCardNumber().slice(-4),
      brand: faker.helpers.arrayElement(['Visa', 'MasterCard', 'American Express', 'Discover']),
      expiryMonth: faker.date.future().getMonth() + 1,
      expiryYear: faker.date.future().getFullYear()
    },
    gateway: {
      provider: faker.helpers.arrayElement(['Stripe', 'PayPal', 'Square', 'Authorize.net', 'Braintree']),
      gatewayId: faker.string.alphanumeric(20),
      fee: faker.number.float({ min: 0.30, max: amount * 0.035, fractionDigits: 2 })
    },
    billing: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.countryCode()
      }
    },
    metadata: {
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
      referrer: faker.internet.url(),
      riskScore: faker.number.float({ min: 0, max: 100, fractionDigits: 1 })
    },
    processedAt: faker.date.recent(),
    settledAt: faker.date.recent(),
    createdAt: faker.date.past()
  };
}

// Generate customer data
function generateCustomer() {
  return {
    id: faker.string.uuid(),
    customerNumber: faker.string.alphanumeric(8).toUpperCase(),
    type: faker.helpers.arrayElement(['individual', 'business']),
    personalInfo: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date.birthdate(),
      gender: faker.person.sex()
    },
    businessInfo: {
      companyName: faker.company.name(),
      taxId: faker.string.alphanumeric(10),
      industry: faker.commerce.department(),
      employeeCount: faker.number.int({ min: 1, max: 10000 })
    },
    addresses: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(['home', 'work', 'billing', 'shipping']),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      isDefault: faker.datatype.boolean()
    })),
    preferences: {
      newsletter: faker.datatype.boolean(),
      smsNotifications: faker.datatype.boolean(),
      language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
      currency: faker.finance.currencyCode()
    },
    stats: {
      totalOrders: faker.number.int({ min: 0, max: 500 }),
      totalSpent: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }),
      averageOrderValue: faker.number.float({ min: 25, max: 500, fractionDigits: 2 }),
      lastOrderDate: faker.date.recent(),
      lifetimeValue: faker.number.float({ min: 100, max: 100000, fractionDigits: 2 })
    },
    segment: faker.helpers.arrayElement(['new', 'regular', 'vip', 'at_risk', 'churned']),
    tags: faker.helpers.arrayElements(['premium', 'bulk_buyer', 'early_adopter', 'loyalty_member'], { min: 0, max: 3 }),
    notes: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate invoice data
function generateInvoice() {
  const lineItems = Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => {
    const quantity = faker.number.int({ min: 1, max: 100 });
    const unitPrice = faker.number.float({ min: 10, max: 1000, fractionDigits: 2 });
    return {
      id: faker.string.uuid(),
      description: faker.commerce.productName(),
      quantity: quantity,
      unitPrice: unitPrice,
      total: parseFloat((quantity * unitPrice).toFixed(2))
    };
  });

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return {
    id: faker.string.uuid(),
    invoiceNumber: `INV-${faker.string.alphanumeric(8).toUpperCase()}`,
    customerId: faker.string.uuid(),
    customerInfo: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      company: faker.company.name(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      }
    },
    lineItems,
    amounts: {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      discount: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
      total: parseFloat(total.toFixed(2))
    },
    currency: faker.finance.currencyCode(),
    status: faker.helpers.arrayElement(['draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled']),
    paymentTerms: faker.helpers.arrayElement(['net_30', 'net_15', 'due_on_receipt', 'net_60']),
    dueDate: faker.date.future(),
    paidDate: faker.datatype.boolean() ? faker.date.recent() : null,
    notes: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
    sentAt: faker.date.recent(),
    updatedAt: faker.date.recent()
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
    const count = parseInt(query.count) || 20;
    const page = parseInt(query.page) || 1;

    switch (endpoint) {
      case 'orders':
        if (method === 'GET') {
          const orders = Array.from({ length: count }, () => generateOrder());
          res.status(200).json({
            data: orders,
            meta: {
              total: count,
              page: page,
              per_page: count,
              has_more: faker.datatype.boolean()
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: generateOrder()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'inventory':
        if (method === 'GET') {
          const inventory = Array.from({ length: count }, () => generateInventoryItem());
          res.status(200).json({
            data: inventory,
            meta: {
              total: count,
              page: page,
              per_page: count,
              low_stock_items: faker.number.int({ min: 0, max: 10 }),
              out_of_stock_items: faker.number.int({ min: 0, max: 5 })
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'transactions':
        if (method === 'GET') {
          const transactions = Array.from({ length: count }, () => generateTransaction());
          res.status(200).json({
            data: transactions,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_volume: faker.number.float({ min: 10000, max: 1000000, fractionDigits: 2 })
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'customers':
        if (method === 'GET') {
          const customers = Array.from({ length: count }, () => generateCustomer());
          res.status(200).json({
            data: customers,
            meta: {
              total: count,
              page: page,
              per_page: count,
              segments: {
                new: faker.number.int({ min: 0, max: count }),
                regular: faker.number.int({ min: 0, max: count }),
                vip: faker.number.int({ min: 0, max: count })
              }
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            customer: generateCustomer()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'invoices':
        if (method === 'GET') {
          const invoices = Array.from({ length: count }, () => generateInvoice());
          res.status(200).json({
            data: invoices,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_outstanding: faker.number.float({ min: 1000, max: 100000, fractionDigits: 2 }),
              overdue_count: faker.number.int({ min: 0, max: 10 })
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            invoice: generateInvoice()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'products':
        if (method === 'GET') {
          const products = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
            category: faker.commerce.department(),
            brand: faker.company.name(),
            sku: faker.string.alphanumeric(10).toUpperCase(),
            stock: faker.number.int({ min: 0, max: 1000 }),
            images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.url()),
            rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
            reviews: faker.number.int({ min: 0, max: 1000 }),
            tags: faker.helpers.arrayElements(['bestseller', 'new', 'sale', 'featured'], { min: 0, max: 3 }),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: products,
            meta: {
              total: count,
              page: page,
              per_page: count,
              categories: [...new Set(products.map(p => p.category))],
              avg_price: products.reduce((sum, p) => sum + p.price, 0) / products.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'carts':
        if (method === 'GET') {
          const carts = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            userId: faker.string.uuid(),
            items: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => ({
              productId: faker.string.uuid(),
              name: faker.commerce.productName(),
              price: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
              quantity: faker.number.int({ min: 1, max: 5 }),
              image: faker.image.url()
            })),
            subtotal: faker.number.float({ min: 50, max: 2000, fractionDigits: 2 }),
            tax: faker.number.float({ min: 5, max: 200, fractionDigits: 2 }),
            shipping: faker.number.float({ min: 0, max: 50, fractionDigits: 2 }),
            total: faker.number.float({ min: 55, max: 2250, fractionDigits: 2 }),
            currency: 'USD',
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: carts,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_cart_value: carts.reduce((sum, c) => sum + c.total, 0) / carts.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'discounts':
        if (method === 'GET') {
          const discounts = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            code: faker.string.alphanumeric(8).toUpperCase(),
            name: faker.lorem.words(2),
            type: faker.helpers.arrayElement(['percentage', 'fixed', 'free_shipping']),
            value: faker.helpers.arrayElement(['percentage', 'fixed']) === 'percentage' 
              ? faker.number.int({ min: 5, max: 50 }) 
              : faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
            minOrder: faker.number.float({ min: 0, max: 200, fractionDigits: 2 }),
            maxUses: faker.number.int({ min: 1, max: 1000 }),
            usedCount: faker.number.int({ min: 0, max: 500 }),
            isActive: faker.datatype.boolean(),
            expiresAt: faker.date.future(),
            applicableTo: faker.helpers.arrayElements(['all', 'categories', 'products', 'customers'], { min: 1, max: 3 }),
            createdAt: faker.date.past()
          }));
          res.status(200).json({
            data: discounts,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: discounts.filter(d => d.isActive).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'shipping':
        if (method === 'GET') {
          const shipping = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            orderId: faker.string.uuid(),
            carrier: faker.helpers.arrayElement(['FedEx', 'UPS', 'USPS', 'DHL', 'Amazon Logistics']),
            trackingNumber: faker.string.alphanumeric(12).toUpperCase(),
            status: faker.helpers.arrayElement(['pending', 'shipped', 'in_transit', 'out_for_delivery', 'delivered', 'failed']),
            estimatedDelivery: faker.date.future(),
            actualDelivery: faker.datatype.boolean() ? faker.date.recent() : null,
            origin: {
              address: faker.location.streetAddress(),
              city: faker.location.city(),
              state: faker.location.state(),
              zipCode: faker.location.zipCode(),
              country: faker.location.country()
            },
            destination: {
              address: faker.location.streetAddress(),
              city: faker.location.city(),
              state: faker.location.state(),
              zipCode: faker.location.zipCode(),
              country: faker.location.country()
            },
            weight: faker.number.float({ min: 0.1, max: 50, fractionDigits: 2 }),
            dimensions: {
              length: faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
              width: faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
              height: faker.number.float({ min: 1, max: 50, fractionDigits: 1 })
            },
            cost: faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: shipping,
            meta: {
              total: count,
              page: page,
              per_page: count,
              delivered_count: shipping.filter(s => s.status === 'delivered').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'returns':
        if (method === 'GET') {
          const returns = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            orderId: faker.string.uuid(),
            customerId: faker.string.uuid(),
            reason: faker.helpers.arrayElement(['defective', 'wrong_item', 'not_as_described', 'changed_mind', 'late_delivery']),
            status: faker.helpers.arrayElement(['requested', 'approved', 'received', 'refunded', 'rejected']),
            items: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
              productId: faker.string.uuid(),
              name: faker.commerce.productName(),
              quantity: faker.number.int({ min: 1, max: 3 }),
              reason: faker.lorem.sentence(),
              condition: faker.helpers.arrayElement(['new', 'opened', 'used', 'damaged'])
            })),
            refundAmount: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
            refundMethod: faker.helpers.arrayElement(['original_payment', 'store_credit', 'gift_card']),
            requestedAt: faker.date.recent(),
            processedAt: faker.datatype.boolean() ? faker.date.recent() : null,
            notes: faker.lorem.paragraph()
          }));
          res.status(200).json({
            data: returns,
            meta: {
              total: count,
              page: page,
              per_page: count,
              approved_count: returns.filter(r => r.status === 'approved').length,
              total_refund_value: returns.reduce((sum, r) => sum + r.refundAmount, 0)
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