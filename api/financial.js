import { faker } from '@faker-js/faker';

// Generate account data
function generateAccount() {
  return {
    id: faker.string.uuid(),
    accountNumber: faker.finance.accountNumber(),
    routingNumber: faker.finance.routingNumber(),
    accountName: faker.finance.accountName(),
    type: faker.helpers.arrayElement(['checking', 'savings', 'credit', 'investment', 'loan', 'mortgage']),
    status: faker.helpers.arrayElement(['active', 'inactive', 'frozen', 'closed']),
    balance: {
      current: faker.number.float({ min: -10000, max: 100000, fractionDigits: 2 }),
      available: faker.number.float({ min: 0, max: 95000, fractionDigits: 2 }),
      pending: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 })
    },
    currency: faker.finance.currencyCode(),
    bank: {
      name: faker.company.name() + ' Bank',
      code: faker.finance.bic(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      }
    },
    holder: {
      name: faker.person.fullName(),
      ssn: faker.string.numeric(9),
      dateOfBirth: faker.date.birthdate(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode()
      }
    },
    limits: {
      dailyWithdrawal: faker.number.float({ min: 500, max: 5000, fractionDigits: 2 }),
      monthlyTransfer: faker.number.float({ min: 10000, max: 100000, fractionDigits: 2 }),
      creditLimit: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 })
    },
    interestRate: faker.number.float({ min: 0.01, max: 15, fractionDigits: 3 }),
    fees: {
      monthly: faker.number.float({ min: 0, max: 25, fractionDigits: 2 }),
      overdraft: faker.number.float({ min: 25, max: 50, fractionDigits: 2 }),
      atm: faker.number.float({ min: 2, max: 5, fractionDigits: 2 })
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    lastActivity: faker.date.recent()
  };
}

// Generate financial transaction data
function generateFinancialTransaction() {
  const amount = faker.number.float({ min: 1, max: 10000, fractionDigits: 2 });
  const isDebit = faker.datatype.boolean();
  
  return {
    id: faker.string.uuid(),
    transactionId: faker.string.alphanumeric(12).toUpperCase(),
    accountId: faker.string.uuid(),
    type: faker.helpers.arrayElement([
      'deposit', 'withdrawal', 'transfer', 'payment', 'refund',
      'fee', 'interest', 'dividend', 'purchase', 'sale'
    ]),
    category: faker.helpers.arrayElement([
      'groceries', 'utilities', 'entertainment', 'transport', 'healthcare',
      'shopping', 'dining', 'travel', 'education', 'investment'
    ]),
    amount: isDebit ? -amount : amount,
    currency: faker.finance.currencyCode(),
    description: faker.finance.transactionDescription(),
    merchant: {
      name: faker.company.name(),
      category: faker.commerce.department(),
      mcc: faker.string.numeric(4),
      location: {
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country()
      }
    },
    paymentMethod: {
      type: faker.helpers.arrayElement(['card', 'ach', 'wire', 'check', 'cash', 'crypto']),
      last4: faker.finance.creditCardNumber().slice(-4),
      network: faker.helpers.arrayElement(['Visa', 'MasterCard', 'AmEx', 'Discover'])
    },
    status: faker.helpers.arrayElement(['pending', 'completed', 'failed', 'cancelled', 'disputed']),
    balanceAfter: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }),
    fees: faker.number.float({ min: 0, max: 25, fractionDigits: 2 }),
    exchangeRate: faker.number.float({ min: 0.5, max: 2, fractionDigits: 4 }),
    location: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      city: faker.location.city(),
      country: faker.location.country()
    },
    tags: faker.helpers.arrayElements(['business', 'personal', 'recurring', 'large'], { min: 0, max: 2 }),
    processedAt: faker.date.recent(),
    settledAt: faker.date.recent(),
    createdAt: faker.date.past()
  };
}

// Generate cryptocurrency data
function generateCryptocurrency() {
  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'DOT', name: 'Polkadot' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'MATIC', name: 'Polygon' },
    { symbol: 'LINK', name: 'Chainlink' },
    { symbol: 'AVAX', name: 'Avalanche' }
  ];
  
  const crypto = faker.helpers.arrayElement(cryptos);
  const price = faker.number.float({ min: 0.01, max: 100000, fractionDigits: 8 });
  const change24h = faker.number.float({ min: -50, max: 50, fractionDigits: 2 });
  
  return {
    id: faker.string.uuid(),
    symbol: crypto.symbol,
    name: crypto.name,
    price: {
      current: price,
      usd: price,
      btc: price / 50000,
      change24h: change24h,
      changePercent24h: faker.number.float({ min: -30, max: 30, fractionDigits: 2 }),
      high24h: price * 1.1,
      low24h: price * 0.9,
      allTimeHigh: price * faker.number.float({ min: 1.5, max: 10 }),
      allTimeLow: price * faker.number.float({ min: 0.1, max: 0.8 })
    },
    marketData: {
      marketCap: faker.number.int({ min: 1000000, max: 1000000000000 }),
      volume24h: faker.number.int({ min: 100000, max: 50000000000 }),
      circulatingSupply: faker.number.int({ min: 1000000, max: 1000000000 }),
      totalSupply: faker.number.int({ min: 1000000, max: 10000000000 }),
      maxSupply: faker.number.int({ min: 10000000, max: 100000000000 }),
      rank: faker.number.int({ min: 1, max: 500 })
    },
    technicalIndicators: {
      rsi: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
      macd: faker.number.float({ min: -1, max: 1, fractionDigits: 4 }),
      sma20: faker.number.float({ min: price * 0.8, max: price * 1.2, fractionDigits: 2 }),
      sma50: faker.number.float({ min: price * 0.7, max: price * 1.3, fractionDigits: 2 }),
      bollinger: {
        upper: price * 1.1,
        middle: price,
        lower: price * 0.9
      }
    },
    blockchain: {
      network: faker.helpers.arrayElement(['mainnet', 'testnet', 'polygon', 'bsc']),
      confirmations: faker.number.int({ min: 1, max: 100 }),
      blockTime: faker.number.float({ min: 1, max: 600, fractionDigits: 1 }),
      hashRate: faker.string.alphanumeric(20),
      difficulty: faker.number.float({ min: 1000000, max: 100000000000000 })
    },
    sentiment: {
      fearGreedIndex: faker.number.int({ min: 0, max: 100 }),
      socialScore: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      newsScore: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      developerScore: faker.number.float({ min: 0, max: 100, fractionDigits: 1 })
    },
    lastUpdated: faker.date.recent(),
    createdAt: faker.date.past()
  };
}

// Generate stock data
function generateStock() {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'NFLX', name: 'Netflix Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'META', name: 'Meta Platforms Inc.' }
  ];
  
  const stock = faker.helpers.arrayElement(stocks);
  const price = faker.number.float({ min: 10, max: 3000, fractionDigits: 2 });
  
  return {
    id: faker.string.uuid(),
    symbol: stock.symbol,
    name: stock.name,
    exchange: faker.helpers.arrayElement(['NYSE', 'NASDAQ', 'AMEX']),
    price: {
      current: price,
      open: price * faker.number.float({ min: 0.98, max: 1.02, fractionDigits: 4 }),
      high: price * faker.number.float({ min: 1.01, max: 1.05, fractionDigits: 4 }),
      low: price * faker.number.float({ min: 0.95, max: 0.99, fractionDigits: 4 }),
      close: price,
      previousClose: price * faker.number.float({ min: 0.97, max: 1.03, fractionDigits: 4 }),
      change: faker.number.float({ min: -50, max: 50, fractionDigits: 2 }),
      changePercent: faker.number.float({ min: -10, max: 10, fractionDigits: 2 }),
      fiftyTwoWeekHigh: price * faker.number.float({ min: 1.2, max: 2, fractionDigits: 2 }),
      fiftyTwoWeekLow: price * faker.number.float({ min: 0.5, max: 0.8, fractionDigits: 2 })
    },
    volume: {
      current: faker.number.int({ min: 100000, max: 100000000 }),
      average: faker.number.int({ min: 500000, max: 50000000 }),
      relative: faker.number.float({ min: 0.5, max: 3, fractionDigits: 2 })
    },
    marketData: {
      marketCap: faker.number.int({ min: 1000000000, max: 3000000000000 }),
      pe: faker.number.float({ min: 5, max: 100, fractionDigits: 2 }),
      eps: faker.number.float({ min: -10, max: 50, fractionDigits: 2 }),
      dividend: faker.number.float({ min: 0, max: 10, fractionDigits: 2 }),
      dividendYield: faker.number.float({ min: 0, max: 8, fractionDigits: 2 }),
      beta: faker.number.float({ min: 0.1, max: 3, fractionDigits: 2 })
    },
    fundamentals: {
      revenue: faker.number.int({ min: 1000000000, max: 500000000000 }),
      netIncome: faker.number.int({ min: -1000000000, max: 100000000000 }),
      totalAssets: faker.number.int({ min: 10000000000, max: 1000000000000 }),
      totalDebt: faker.number.int({ min: 0, max: 200000000000 }),
      freeCashFlow: faker.number.int({ min: -5000000000, max: 100000000000 })
    },
    sector: faker.helpers.arrayElement([
      'Technology', 'Healthcare', 'Financial Services', 'Consumer Cyclical',
      'Energy', 'Industrials', 'Real Estate', 'Utilities', 'Materials'
    ]),
    industry: faker.commerce.department(),
    employees: faker.number.int({ min: 1000, max: 2000000 }),
    founded: faker.date.past({ years: 100 }),
    headquarters: {
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country()
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
    const count = parseInt(query.count) || 20;
    const page = parseInt(query.page) || 1;

    switch (endpoint) {
      case 'accounts':
        if (method === 'GET') {
          const accounts = Array.from({ length: count }, () => generateAccount());
          res.status(200).json({
            data: accounts,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_balance: accounts.reduce((sum, a) => sum + a.balance.current, 0),
              by_type: {
                checking: accounts.filter(a => a.type === 'checking').length,
                savings: accounts.filter(a => a.type === 'savings').length,
                credit: accounts.filter(a => a.type === 'credit').length
              }
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'transactions':
        if (method === 'GET') {
          const transactions = Array.from({ length: count }, () => generateFinancialTransaction());
          res.status(200).json({
            data: transactions,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_amount: transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0),
              by_status: {
                completed: transactions.filter(t => t.status === 'completed').length,
                pending: transactions.filter(t => t.status === 'pending').length,
                failed: transactions.filter(t => t.status === 'failed').length
              }
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'cryptocurrencies':
        if (method === 'GET') {
          const cryptos = Array.from({ length: count }, () => generateCryptocurrency());
          res.status(200).json({
            data: cryptos,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_market_cap: cryptos.reduce((sum, c) => sum + c.marketData.marketCap, 0),
              avg_change_24h: cryptos.reduce((sum, c) => sum + c.price.change24h, 0) / cryptos.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'stocks':
        if (method === 'GET') {
          const stocks = Array.from({ length: count }, () => generateStock());
          res.status(200).json({
            data: stocks,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_market_cap: stocks.reduce((sum, s) => sum + s.marketData.marketCap, 0),
              avg_change: stocks.reduce((sum, s) => sum + s.price.changePercent, 0) / stocks.length,
              by_sector: stocks.reduce((acc, s) => {
                acc[s.sector] = (acc[s.sector] || 0) + 1;
                return acc;
              }, {})
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'loans':
        if (method === 'GET') {
          const loans = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            accountId: faker.string.uuid(),
            type: faker.helpers.arrayElement(['personal', 'business', 'student', 'auto', 'home', 'credit_card']),
            amount: faker.number.float({ min: 1000, max: 500000, fractionDigits: 2 }),
            balance: faker.number.float({ min: 0, max: 500000, fractionDigits: 2 }),
            interestRate: faker.number.float({ min: 3.5, max: 25, fractionDigits: 2 }),
            term: faker.number.int({ min: 12, max: 360 }),
            monthlyPayment: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
            status: faker.helpers.arrayElement(['active', 'paid_off', 'defaulted', 'in_grace_period']),
            lender: faker.company.name(),
            purpose: faker.lorem.sentence(),
            collateral: faker.datatype.boolean() ? {
              type: faker.helpers.arrayElement(['real_estate', 'vehicle', 'securities', 'other']),
              value: faker.number.float({ min: 5000, max: 1000000, fractionDigits: 2 })
            } : null,
            payments: Array.from({ length: faker.number.int({ min: 0, max: 60 }) }, () => ({
              date: faker.date.past(),
              amount: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
              principal: faker.number.float({ min: 20, max: 4000, fractionDigits: 2 }),
              interest: faker.number.float({ min: 5, max: 1000, fractionDigits: 2 })
            })),
            nextPayment: faker.date.future(),
            dueDate: faker.date.future(),
            originationDate: faker.date.past(),
            maturityDate: faker.date.future()
          }));
          res.status(200).json({
            data: loans,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_balance: loans.reduce((sum, l) => sum + l.balance, 0),
              avg_interest_rate: loans.reduce((sum, l) => sum + l.interestRate, 0) / loans.length,
              active_count: loans.filter(l => l.status === 'active').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'investments':
        if (method === 'GET') {
          const investments = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            accountId: faker.string.uuid(),
            type: faker.helpers.arrayElement(['stocks', 'bonds', 'mutual_funds', 'etf', 'retirement', 'crypto', 'real_estate']),
            name: faker.company.name() + ' ' + faker.helpers.arrayElement(['Fund', 'Trust', 'Investment', 'Portfolio']),
            symbol: faker.string.alphanumeric(4).toUpperCase(),
            quantity: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
            averageCost: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
            currentPrice: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
            marketValue: faker.number.float({ min: 1000, max: 1000000, fractionDigits: 2 }),
            gainLoss: faker.number.float({ min: -50000, max: 50000, fractionDigits: 2 }),
            gainLossPercent: faker.number.float({ min: -50, max: 100, fractionDigits: 2 }),
            dividends: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
            fees: faker.number.float({ min: 0, max: 500, fractionDigits: 2 }),
            broker: faker.company.name(),
            sector: faker.helpers.arrayElement(['technology', 'healthcare', 'finance', 'energy', 'consumer', 'industrial']),
            risk: faker.helpers.arrayElement(['low', 'medium', 'high']),
            purchaseDate: faker.date.past(),
            lastUpdated: faker.date.recent()
          }));
          res.status(200).json({
            data: investments,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_value: investments.reduce((sum, i) => sum + i.marketValue, 0),
              total_gain_loss: investments.reduce((sum, i) => sum + i.gainLoss, 0),
              profitable_count: investments.filter(i => i.gainLoss > 0).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'cards':
        if (method === 'GET') {
          const cards = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            accountId: faker.string.uuid(),
            type: faker.helpers.arrayElement(['credit', 'debit', 'prepaid', 'business']),
            network: faker.helpers.arrayElement(['Visa', 'Mastercard', 'American Express', 'Discover']),
            number: faker.finance.creditCardNumber(),
            holderName: faker.person.fullName(),
            expiryMonth: faker.number.int({ min: 1, max: 12 }),
            expiryYear: faker.number.int({ min: 2024, max: 2030 }),
            cvv: faker.finance.creditCardCVV(),
            status: faker.helpers.arrayElement(['active', 'blocked', 'expired', 'cancelled']),
            limit: faker.number.float({ min: 500, max: 50000, fractionDigits: 2 }),
            balance: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }),
            availableCredit: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }),
            minimumPayment: faker.number.float({ min: 25, max: 500, fractionDigits: 2 }),
            dueDate: faker.date.future(),
            lastPayment: faker.date.recent(),
            rewards: {
              points: faker.number.int({ min: 0, max: 100000 }),
              cashback: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
              miles: faker.number.int({ min: 0, max: 50000 })
            },
            features: faker.helpers.arrayElements([
              'contactless', 'apple_pay', 'google_pay', 'travel_insurance',
              'purchase_protection', 'price_guarantee', 'extended_warranty'
            ], { min: 2, max: 5 }),
            issuedDate: faker.date.past(),
            annualFee: faker.number.float({ min: 0, max: 500, fractionDigits: 2 })
          }));
          res.status(200).json({
            data: cards,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_balance: cards.reduce((sum, c) => sum + c.balance, 0),
              active_count: cards.filter(c => c.status === 'active').length,
              credit_cards: cards.filter(c => c.type === 'credit').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'transfers':
        if (method === 'GET') {
          const transfers = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            fromAccount: faker.string.uuid(),
            toAccount: faker.string.uuid(),
            amount: faker.number.float({ min: 10, max: 10000, fractionDigits: 2 }),
            currency: faker.finance.currencyCode(),
            type: faker.helpers.arrayElement(['internal', 'external', 'wire', 'ach', 'instant']),
            status: faker.helpers.arrayElement(['pending', 'processing', 'completed', 'failed', 'cancelled']),
            description: faker.lorem.sentence(),
            fee: faker.number.float({ min: 0, max: 50, fractionDigits: 2 }),
            exchangeRate: faker.datatype.boolean() ? faker.number.float({ min: 0.8, max: 1.5, fractionDigits: 4 }) : null,
            scheduledDate: faker.datatype.boolean() ? faker.date.future() : null,
            recurring: faker.datatype.boolean() ? {
              frequency: faker.helpers.arrayElement(['daily', 'weekly', 'monthly', 'quarterly']),
              endDate: faker.date.future()
            } : null,
            initiatedBy: faker.person.fullName(),
            approvedBy: faker.datatype.boolean() ? faker.person.fullName() : null,
            createdAt: faker.date.recent(),
            completedAt: faker.datatype.boolean() ? faker.date.recent() : null
          }));
          res.status(200).json({
            data: transfers,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_amount: transfers.reduce((sum, t) => sum + t.amount, 0),
              completed_count: transfers.filter(t => t.status === 'completed').length,
              pending_count: transfers.filter(t => t.status === 'pending').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'budgets':
        if (method === 'GET') {
          const budgets = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            accountId: faker.string.uuid(),
            name: faker.lorem.words(2),
            category: faker.helpers.arrayElement(['food', 'transportation', 'entertainment', 'utilities', 'healthcare', 'shopping', 'education', 'travel']),
            period: faker.helpers.arrayElement(['weekly', 'monthly', 'quarterly', 'yearly']),
            limit: faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }),
            spent: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
            remaining: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
            status: faker.helpers.arrayElement(['on_track', 'over_budget', 'under_budget']),
            alerts: {
              warning: faker.number.float({ min: 50, max: 90, fractionDigits: 1 }),
              critical: faker.number.float({ min: 90, max: 100, fractionDigits: 1 })
            },
            transactions: Array.from({ length: faker.number.int({ min: 5, max: 50 }) }, () => ({
              id: faker.string.uuid(),
              date: faker.date.recent(),
              amount: faker.number.float({ min: 5, max: 500, fractionDigits: 2 }),
              description: faker.lorem.words(3),
              category: faker.lorem.word()
            })),
            goals: faker.datatype.boolean() ? {
              target: faker.number.float({ min: 500, max: 10000, fractionDigits: 2 }),
              deadline: faker.date.future(),
              progress: faker.number.float({ min: 0, max: 100, fractionDigits: 1 })
            } : null,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: budgets,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_spent: budgets.reduce((sum, b) => sum + b.spent, 0),
              over_budget_count: budgets.filter(b => b.status === 'over_budget').length,
              avg_utilization: budgets.reduce((sum, b) => sum + (b.spent / b.limit * 100), 0) / budgets.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'taxes':
        if (method === 'GET') {
          const taxes = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            accountId: faker.string.uuid(),
            taxYear: faker.number.int({ min: 2020, max: 2024 }),
            type: faker.helpers.arrayElement(['income', 'property', 'sales', 'capital_gains', 'self_employment']),
            status: faker.helpers.arrayElement(['filed', 'pending', 'extension', 'amended', 'audit']),
            income: {
              gross: faker.number.float({ min: 30000, max: 200000, fractionDigits: 2 }),
              taxable: faker.number.float({ min: 25000, max: 180000, fractionDigits: 2 }),
              deductions: faker.number.float({ min: 0, max: 25000, fractionDigits: 2 })
            },
            taxOwed: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }),
            taxPaid: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }),
            refund: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
            brackets: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
              range: `${faker.number.int({ min: 0, max: 100000 })}-${faker.number.int({ min: 100000, max: 500000 })}`,
              rate: faker.number.float({ min: 0.1, max: 0.37, fractionDigits: 3 }),
              amount: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 })
            })),
            documents: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
              type: faker.helpers.arrayElement(['W2', '1099', 'Schedule A', 'Schedule C', 'K1']),
              status: faker.helpers.arrayElement(['received', 'pending', 'processed']),
              dateReceived: faker.date.recent()
            })),
            filing: {
              method: faker.helpers.arrayElement(['paper', 'electronic', 'professional']),
              preparer: faker.datatype.boolean() ? faker.person.fullName() : null,
              cost: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })
            },
            dueDate: faker.date.future(),
            filedDate: faker.datatype.boolean() ? faker.date.recent() : null
          }));
          res.status(200).json({
            data: taxes,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_tax_owed: taxes.reduce((sum, t) => sum + t.taxOwed, 0),
              filed_count: taxes.filter(t => t.status === 'filed').length,
              avg_effective_rate: taxes.reduce((sum, t) => sum + (t.taxOwed / t.income.taxable), 0) / taxes.length * 100
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