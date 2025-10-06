// Shared data relationships utility
// This creates consistent foreign key relationships across all APIs

import { faker } from '@faker-js/faker';

// Global registry for cross-API relationships
const sharedData = {
  users: new Map(),
  customers: new Map(),
  employees: new Map(),
  patients: new Map(),
  players: new Map(),
  devices: new Map(),
  accounts: new Map(),
  products: new Map(),
  orders: new Map(),
  posts: new Map(),
  companies: new Map()
};

// Initialize shared data with base entities
function initializeSharedData() {
  // Create base users that can be referenced across APIs
  for (let i = 0; i < 100; i++) {
    const userId = faker.string.uuid();
    const user = {
      id: userId,
      email: faker.internet.email(),
      username: faker.internet.username(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past()
    };
    sharedData.users.set(userId, user);
  }

  // Create companies
  for (let i = 0; i < 50; i++) {
    const companyId = faker.string.uuid();
    const company = {
      id: companyId,
      name: faker.company.name(),
      domain: faker.internet.domainName(),
      industry: faker.company.buzzPhrase(),
      createdAt: faker.date.past()
    };
    sharedData.companies.set(companyId, company);
  }

  // Create products
  for (let i = 0; i < 200; i++) {
    const productId = faker.string.uuid();
    const product = {
      id: productId,
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
      category: faker.commerce.department(),
      companyId: faker.helpers.arrayElement(Array.from(sharedData.companies.keys())),
      createdAt: faker.date.past()
    };
    sharedData.products.set(productId, product);
  }

  // Create customers (linked to users)
  Array.from(sharedData.users.values()).slice(0, 80).forEach(user => {
    const customerId = faker.string.uuid();
    const customer = {
      id: customerId,
      userId: user.id,
      companyId: faker.helpers.arrayElement(Array.from(sharedData.companies.keys())),
      loyaltyPoints: faker.number.int({ min: 0, max: 10000 }),
      totalSpent: faker.number.float({ min: 100, max: 50000, fractionDigits: 2 }),
      createdAt: faker.date.past()
    };
    sharedData.customers.set(customerId, customer);
  });

  // Create employees (linked to users)
  Array.from(sharedData.users.values()).slice(0, 60).forEach(user => {
    const employeeId = faker.string.uuid();
    const employee = {
      id: employeeId,
      userId: user.id,
      companyId: faker.helpers.arrayElement(Array.from(sharedData.companies.keys())),
      department: faker.helpers.arrayElement(['Engineering', 'Sales', 'Marketing', 'HR', 'Finance']),
      position: faker.person.jobTitle(),
      salary: faker.number.int({ min: 40000, max: 150000 }),
      hireDate: faker.date.past({ years: 5 }),
      managerId: faker.helpers.maybe(() => faker.string.uuid(), { probability: 0.7 })
    };
    sharedData.employees.set(employeeId, employee);
  });

  // Create patients (linked to users)
  Array.from(sharedData.users.values()).slice(0, 40).forEach(user => {
    const patientId = faker.string.uuid();
    const patient = {
      id: patientId,
      userId: user.id,
      medicalRecordNumber: faker.string.alphanumeric(10).toUpperCase(),
      bloodType: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      primaryPhysicianId: faker.helpers.maybe(() => faker.string.uuid(), { probability: 0.8 }),
      createdAt: faker.date.past()
    };
    sharedData.patients.set(patientId, patient);
  });

  // Create gaming players (linked to users)
  Array.from(sharedData.users.values()).slice(0, 70).forEach(user => {
    const playerId = faker.string.uuid();
    const player = {
      id: playerId,
      userId: user.id,
      username: user.username,
      level: faker.number.int({ min: 1, max: 100 }),
      experience: faker.number.int({ min: 0, max: 100000 }),
      rank: faker.helpers.arrayElement(['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']),
      createdAt: faker.date.past()
    };
    sharedData.players.set(playerId, player);
  });

  // Create IoT devices
  for (let i = 0; i < 150; i++) {
    const deviceId = faker.string.uuid();
    const device = {
      id: deviceId,
      ownerId: faker.helpers.arrayElement(Array.from(sharedData.users.keys())),
      deviceId: faker.string.alphanumeric(12).toUpperCase(),
      type: faker.helpers.arrayElement(['smart_bulb', 'thermostat', 'security_camera', 'smart_lock', 'motion_sensor']),
      manufacturer: faker.company.name(),
      createdAt: faker.date.past()
    };
    sharedData.devices.set(deviceId, device);
  }

  // Create financial accounts (linked to users)
  Array.from(sharedData.users.values()).slice(0, 90).forEach(user => {
    const accountId = faker.string.uuid();
    const account = {
      id: accountId,
      userId: user.id,
      accountNumber: faker.finance.accountNumber(),
      type: faker.helpers.arrayElement(['checking', 'savings', 'credit']),
      balance: faker.number.float({ min: -1000, max: 50000, fractionDigits: 2 }),
      createdAt: faker.date.past()
    };
    sharedData.accounts.set(accountId, account);
  });

  // Create orders (linked to customers and products)
  for (let i = 0; i < 300; i++) {
    const orderId = faker.string.uuid();
    const customerId = faker.helpers.arrayElement(Array.from(sharedData.customers.keys()));
    const customer = sharedData.customers.get(customerId);

    const order = {
      id: orderId,
      customerId: customerId,
      userId: customer?.userId,
      items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
        const productId = faker.helpers.arrayElement(Array.from(sharedData.products.keys()));
        const product = sharedData.products.get(productId);
        return {
          productId: productId,
          quantity: faker.number.int({ min: 1, max: 10 }),
          price: product?.price || faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
          product: product
        };
      }),
      total: 0, // Will be calculated
      status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
      createdAt: faker.date.past()
    };

    // Calculate total
    order.total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    sharedData.orders.set(orderId, order);
  }

  // Create social posts (linked to users)
  Array.from(sharedData.users.values()).slice(0, 95).forEach(user => {
    for (let i = 0; i < faker.number.int({ min: 1, max: 10 }); i++) {
      const postId = faker.string.uuid();
      const post = {
        id: postId,
        authorId: user.id,
        author: user,
        content: faker.lorem.paragraphs({ min: 1, max: 3 }),
        likes: faker.number.int({ min: 0, max: 1000 }),
        shares: faker.number.int({ min: 0, max: 500 }),
        comments: faker.number.int({ min: 0, max: 200 }),
        createdAt: faker.date.past()
      };
      sharedData.posts.set(postId, post);
    }
  });
}

// Initialize shared data on module load
initializeSharedData();

// Utility functions for cross-API relationships
export const getSharedData = () => sharedData;

export const getRandomUser = () => faker.helpers.arrayElement(Array.from(sharedData.users.values()));
export const getRandomCustomer = () => faker.helpers.arrayElement(Array.from(sharedData.customers.values()));
export const getRandomEmployee = () => faker.helpers.arrayElement(Array.from(sharedData.employees.values()));
export const getRandomPatient = () => faker.helpers.arrayElement(Array.from(sharedData.patients.values()));
export const getRandomPlayer = () => faker.helpers.arrayElement(Array.from(sharedData.players.values()));
export const getRandomDevice = () => faker.helpers.arrayElement(Array.from(sharedData.devices.values()));
export const getRandomAccount = () => faker.helpers.arrayElement(Array.from(sharedData.accounts.values()));
export const getRandomProduct = () => faker.helpers.arrayElement(Array.from(sharedData.products.values()));
export const getRandomOrder = () => faker.helpers.arrayElement(Array.from(sharedData.orders.values()));
export const getRandomPost = () => faker.helpers.arrayElement(Array.from(sharedData.posts.values()));
export const getRandomCompany = () => faker.helpers.arrayElement(Array.from(sharedData.companies.values()));

export const getUserById = (id) => sharedData.users.get(id);
export const getCustomerById = (id) => sharedData.customers.get(id);
export const getEmployeeById = (id) => sharedData.employees.get(id);
export const getPatientById = (id) => sharedData.patients.get(id);
export const getPlayerById = (id) => sharedData.players.get(id);
export const getDeviceById = (id) => sharedData.devices.get(id);
export const getAccountById = (id) => sharedData.accounts.get(id);
export const getProductById = (id) => sharedData.products.get(id);
export const getOrderById = (id) => sharedData.orders.get(id);
export const getPostById = (id) => sharedData.posts.get(id);
export const getCompanyById = (id) => sharedData.companies.get(id);

// Get related entities
export const getUserOrders = (userId) => Array.from(sharedData.orders.values()).filter(order => order.userId === userId);
export const getUserPosts = (userId) => Array.from(sharedData.posts.values()).filter(post => post.authorId === userId);
export const getUserDevices = (userId) => Array.from(sharedData.devices.values()).filter(device => device.ownerId === userId);
export const getUserAccounts = (userId) => Array.from(sharedData.accounts.values()).filter(account => account.userId === userId);
export const getCompanyEmployees = (companyId) => Array.from(sharedData.employees.values()).filter(emp => emp.companyId === companyId);
export const getCompanyProducts = (companyId) => Array.from(sharedData.products.values()).filter(product => product.companyId === companyId);
export const getCustomerOrders = (customerId) => Array.from(sharedData.orders.values()).filter(order => order.customerId === customerId);

// Advanced relationship queries
export const getUserProfile = (userId) => {
  const user = sharedData.users.get(userId);
  if (!user) return null;

  return {
    ...user,
    customerProfile: Array.from(sharedData.customers.values()).find(c => c.userId === userId),
    employeeProfile: Array.from(sharedData.employees.values()).find(e => e.userId === userId),
    patientProfile: Array.from(sharedData.patients.values()).find(p => p.userId === userId),
    playerProfile: Array.from(sharedData.players.values()).find(p => p.userId === userId),
    orders: getUserOrders(userId),
    posts: getUserPosts(userId),
    devices: getUserDevices(userId),
    accounts: getUserAccounts(userId)
  };
};

export const getOrderDetails = (orderId) => {
  const order = sharedData.orders.get(orderId);
  if (!order) return null;

  return {
    ...order,
    customer: sharedData.customers.get(order.customerId),
    user: sharedData.users.get(order.userId),
    items: order.items.map(item => ({
      ...item,
      product: sharedData.products.get(item.productId)
    }))
  };
};