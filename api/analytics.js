import { faker } from '@faker-js/faker';

// Generate analytics data
function generateAnalytics() {
  return {
    id: faker.string.uuid(),
    metric: faker.helpers.arrayElement([
      'page_views', 'unique_visitors', 'bounce_rate', 'session_duration',
      'conversion_rate', 'click_through_rate', 'revenue', 'user_engagement'
    ]),
    value: faker.number.float({ min: 0, max: 100000, fractionDigits: 2 }),
    previousValue: faker.number.float({ min: 0, max: 100000, fractionDigits: 2 }),
    change: faker.number.float({ min: -50, max: 100, fractionDigits: 2 }),
    changeType: faker.helpers.arrayElement(['increase', 'decrease', 'stable']),
    period: faker.helpers.arrayElement(['daily', 'weekly', 'monthly', 'yearly']),
    date: faker.date.recent(),
    dimensions: {
      source: faker.helpers.arrayElement(['organic', 'social', 'paid', 'direct', 'email', 'referral']),
      device: faker.helpers.arrayElement(['desktop', 'mobile', 'tablet']),
      country: faker.location.country(),
      browser: faker.helpers.arrayElement(['Chrome', 'Firefox', 'Safari', 'Edge']),
      os: faker.helpers.arrayElement(['Windows', 'macOS', 'Linux', 'iOS', 'Android'])
    },
    goals: {
      target: faker.number.float({ min: 1000, max: 50000, fractionDigits: 2 }),
      achieved: faker.number.float({ min: 500, max: 60000, fractionDigits: 2 }),
      completion: faker.number.float({ min: 0, max: 150, fractionDigits: 1 })
    },
    segments: faker.helpers.arrayElements(['new_users', 'returning_users', 'premium_users'], { min: 1, max: 3 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate event data
function generateEvent() {
  const eventTypes = [
    'user_signup', 'user_login', 'user_logout', 'page_view', 'button_click',
    'form_submit', 'purchase', 'download', 'video_play', 'search',
    'add_to_cart', 'remove_from_cart', 'checkout_start', 'checkout_complete',
    'share', 'like', 'comment', 'subscribe', 'unsubscribe'
  ];

  return {
    id: faker.string.uuid(),
    eventId: faker.string.alphanumeric(16),
    type: faker.helpers.arrayElement(eventTypes),
    category: faker.helpers.arrayElement(['user_action', 'system', 'marketing', 'commerce', 'content']),
    action: faker.lorem.words(2),
    label: faker.lorem.words(3),
    value: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
    userId: faker.string.uuid(),
    sessionId: faker.string.uuid(),
    properties: {
      page_url: faker.internet.url(),
      page_title: faker.lorem.sentence(),
      referrer: faker.internet.url(),
      user_agent: faker.internet.userAgent(),
      ip_address: faker.internet.ip(),
      screen_resolution: `${faker.number.int({ min: 1024, max: 2560 })}x${faker.number.int({ min: 768, max: 1440 })}`,
      viewport_size: `${faker.number.int({ min: 320, max: 1920 })}x${faker.number.int({ min: 568, max: 1080 })}`,
      language: faker.helpers.arrayElement(['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP']),
      timezone: faker.location.timeZone(),
      currency: faker.finance.currencyCode()
    },
    context: {
      campaign: {
        source: faker.helpers.arrayElement(['google', 'facebook', 'twitter', 'email', 'direct']),
        medium: faker.helpers.arrayElement(['organic', 'cpc', 'social', 'email', 'referral']),
        campaign: faker.lorem.words(3),
        term: faker.lorem.words(2),
        content: faker.lorem.words(3)
      },
      device: {
        type: faker.helpers.arrayElement(['desktop', 'mobile', 'tablet']),
        brand: faker.helpers.arrayElement(['Apple', 'Samsung', 'Google', 'Microsoft']),
        model: faker.lorem.word(),
        os: faker.helpers.arrayElement(['Windows', 'macOS', 'iOS', 'Android', 'Linux']),
        browser: faker.helpers.arrayElement(['Chrome', 'Safari', 'Firefox', 'Edge'])
      }
    },
    metadata: {
      server_timestamp: faker.date.recent(),
      processing_time: faker.number.float({ min: 0.1, max: 5.0, fractionDigits: 3 }),
      data_source: faker.helpers.arrayElement(['web', 'mobile_app', 'api', 'webhook']),
      version: faker.system.semver()
    },
    timestamp: faker.date.recent(),
    createdAt: faker.date.recent()
  };
}

// Generate report data
function generateReport() {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(4),
    type: faker.helpers.arrayElement([
      'traffic_report', 'conversion_report', 'revenue_report', 'user_behavior',
      'performance_report', 'engagement_report', 'acquisition_report', 'retention_report'
    ]),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['generating', 'completed', 'failed', 'scheduled']),
    format: faker.helpers.arrayElement(['pdf', 'excel', 'csv', 'json']),
    schedule: {
      frequency: faker.helpers.arrayElement(['daily', 'weekly', 'monthly', 'quarterly']),
      dayOfWeek: faker.date.weekday(),
      timeOfDay: faker.date.recent().toTimeString().slice(0, 5),
      timezone: faker.location.timeZone(),
      isActive: faker.datatype.boolean()
    },
    dateRange: {
      start: faker.date.past(),
      end: faker.date.recent(),
      period: faker.helpers.arrayElement(['last_7_days', 'last_30_days', 'last_quarter', 'last_year', 'custom'])
    },
    filters: {
      segments: faker.helpers.arrayElements(['new_users', 'returning_users', 'premium_users'], { min: 0, max: 2 }),
      countries: faker.helpers.arrayElements([faker.location.country(), faker.location.country()], { min: 0, max: 2 }),
      devices: faker.helpers.arrayElements(['desktop', 'mobile', 'tablet'], { min: 0, max: 2 }),
      sources: faker.helpers.arrayElements(['organic', 'paid', 'social', 'direct'], { min: 0, max: 2 })
    },
    metrics: faker.helpers.arrayElements([
      'users', 'sessions', 'pageviews', 'bounce_rate', 'conversion_rate', 'revenue'
    ], { min: 3, max: 6 }),
    recipients: faker.helpers.multiple(() => faker.internet.email(), { count: { min: 1, max: 5 } }),
    fileUrl: faker.internet.url(),
    fileSize: faker.number.int({ min: 1024, max: 10485760 }),
    generatedBy: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email()
    },
    lastGenerated: faker.date.recent(),
    nextScheduled: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate log entry
function generateLog() {
  const levels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const services = ['api', 'web', 'database', 'cache', 'queue', 'auth', 'payment', 'email'];
  
  return {
    id: faker.string.uuid(),
    timestamp: faker.date.recent(),
    level: faker.helpers.arrayElement(levels),
    service: faker.helpers.arrayElement(services),
    module: faker.lorem.word(),
    message: faker.lorem.sentence(),
    details: faker.lorem.paragraph(),
    requestId: faker.string.uuid(),
    userId: faker.datatype.boolean() ? faker.string.uuid() : null,
    sessionId: faker.string.uuid(),
    method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
    url: faker.internet.url(),
    statusCode: faker.helpers.arrayElement([200, 201, 400, 401, 403, 404, 422, 500, 502, 503]),
    responseTime: faker.number.int({ min: 1, max: 5000 }),
    userAgent: faker.internet.userAgent(),
    ipAddress: faker.internet.ip(),
    location: {
      country: faker.location.country(),
      city: faker.location.city(),
      coordinates: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude()
      }
    },
    environment: faker.helpers.arrayElement(['development', 'staging', 'production']),
    version: faker.system.semver(),
    metadata: {
      memoryUsage: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
      cpuUsage: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      dbQueries: faker.number.int({ min: 0, max: 50 }),
      cacheHits: faker.number.int({ min: 0, max: 100 }),
      errorCode: faker.string.alphanumeric(8).toUpperCase()
    },
    tags: faker.helpers.arrayElements(['urgent', 'security', 'performance', 'database'], { min: 0, max: 3 }),
    createdAt: faker.date.recent()
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
      case 'analytics':
        if (method === 'GET') {
          const analytics = Array.from({ length: count }, () => generateAnalytics());
          res.status(200).json({
            data: analytics,
            meta: {
              total: count,
              page: page,
              per_page: count,
              summary: {
                total_sessions: faker.number.int({ min: 10000, max: 1000000 }),
                total_users: faker.number.int({ min: 5000, max: 500000 }),
                avg_session_duration: faker.number.float({ min: 60, max: 600, fractionDigits: 1 }),
                bounce_rate: faker.number.float({ min: 20, max: 80, fractionDigits: 1 })
              }
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'events':
        if (method === 'GET') {
          const events = Array.from({ length: count }, () => generateEvent());
          res.status(200).json({
            data: events,
            meta: {
              total: count,
              page: page,
              per_page: count,
              event_types: [...new Set(events.map(e => e.type))].length,
              total_value: events.reduce((sum, e) => sum + e.value, 0)
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Event tracked successfully',
            event: generateEvent()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'reports':
        if (method === 'GET') {
          const reports = Array.from({ length: count }, () => generateReport());
          res.status(200).json({
            data: reports,
            meta: {
              total: count,
              page: page,
              per_page: count,
              scheduled_count: reports.filter(r => r.schedule.isActive).length,
              completed_count: reports.filter(r => r.status === 'completed').length
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Report created successfully',
            report: generateReport()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'logs':
        if (method === 'GET') {
          const logs = Array.from({ length: count }, () => generateLog());
          res.status(200).json({
            data: logs,
            meta: {
              total: count,
              page: page,
              per_page: count,
              by_level: {
                error: logs.filter(l => l.level === 'error').length,
                warn: logs.filter(l => l.level === 'warn').length,
                info: logs.filter(l => l.level === 'info').length,
                debug: logs.filter(l => l.level === 'debug').length
              },
              avg_response_time: logs.reduce((sum, l) => sum + l.responseTime, 0) / logs.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'dashboards':
        if (method === 'GET') {
          const dashboards = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            owner: faker.person.fullName(),
            widgets: Array.from({ length: faker.number.int({ min: 3, max: 12 }) }, () => ({
              id: faker.string.uuid(),
              type: faker.helpers.arrayElement(['chart', 'metric', 'table', 'map', 'timeline']),
              title: faker.lorem.words(2),
              data: generateAnalytics(),
              position: {
                x: faker.number.int({ min: 0, max: 12 }),
                y: faker.number.int({ min: 0, max: 12 }),
                width: faker.number.int({ min: 3, max: 6 }),
                height: faker.number.int({ min: 2, max: 4 })
              }
            })),
            isPublic: faker.datatype.boolean(),
            tags: faker.helpers.arrayElements(['sales', 'marketing', 'product', 'finance', 'operations'], { min: 1, max: 3 }),
            lastViewed: faker.date.recent(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: dashboards,
            meta: {
              total: count,
              page: page,
              per_page: count,
              public_count: dashboards.filter(d => d.isPublic).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'funnels':
        if (method === 'GET') {
          const funnels = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            description: faker.lorem.sentence(),
            steps: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, (_, index) => ({
              id: faker.string.uuid(),
              name: faker.lorem.words(2),
              order: index + 1,
              users: faker.number.int({ min: 100, max: 10000 }),
              conversion: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
              dropoff: faker.number.float({ min: 0, max: 50, fractionDigits: 1 })
            })),
            totalUsers: faker.number.int({ min: 1000, max: 50000 }),
            conversionRate: faker.number.float({ min: 1, max: 25, fractionDigits: 1 }),
            avgTime: faker.number.int({ min: 60, max: 3600 }),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: funnels,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_conversion: funnels.reduce((sum, f) => sum + f.conversionRate, 0) / funnels.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'cohorts':
        if (method === 'GET') {
          const cohorts = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            period: faker.helpers.arrayElement(['weekly', 'monthly', 'quarterly']),
            startDate: faker.date.past(),
            endDate: faker.date.future(),
            size: faker.number.int({ min: 100, max: 10000 }),
            retention: Array.from({ length: faker.number.int({ min: 4, max: 12 }) }, (_, index) => ({
              period: index + 1,
              retained: faker.number.int({ min: 10, max: 100 }),
              percentage: faker.number.float({ min: 1, max: 100, fractionDigits: 1 })
            })),
            metrics: {
              revenue: faker.number.float({ min: 1000, max: 100000, fractionDigits: 2 }),
              orders: faker.number.int({ min: 10, max: 1000 }),
              engagement: faker.number.float({ min: 0, max: 100, fractionDigits: 1 })
            },
            createdAt: faker.date.past()
          }));
          res.status(200).json({
            data: cohorts,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_size: cohorts.reduce((sum, c) => sum + c.size, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'segments':
        if (method === 'GET') {
          const segments = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            description: faker.lorem.sentence(),
            criteria: {
              age: { min: faker.number.int({ min: 18, max: 30 }), max: faker.number.int({ min: 31, max: 65 }) },
              location: faker.location.country(),
              behavior: faker.helpers.arrayElements(['high_engagement', 'frequent_visitor', 'big_spender', 'new_user'], { min: 1, max: 3 }),
              device: faker.helpers.arrayElement(['mobile', 'desktop', 'tablet'])
            },
            size: faker.number.int({ min: 100, max: 50000 }),
            growth: faker.number.float({ min: -10, max: 25, fractionDigits: 1 }),
            value: faker.number.float({ min: 1000, max: 100000, fractionDigits: 2 }),
            isActive: faker.datatype.boolean(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: segments,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: segments.filter(s => s.isActive).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'goals':
        if (method === 'GET') {
          const goals = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            type: faker.helpers.arrayElement(['conversion', 'engagement', 'revenue', 'retention']),
            target: faker.number.float({ min: 100, max: 100000, fractionDigits: 2 }),
            current: faker.number.float({ min: 0, max: 100000, fractionDigits: 2 }),
            progress: faker.number.float({ min: 0, max: 150, fractionDigits: 1 }),
            status: faker.helpers.arrayElement(['active', 'completed', 'paused', 'failed']),
            timeframe: {
              start: faker.date.past(),
              end: faker.date.future()
            },
            attribution: faker.helpers.arrayElement(['first_touch', 'last_touch', 'linear', 'time_decay']),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: goals,
            meta: {
              total: count,
              page: page,
              per_page: count,
              completed_count: goals.filter(g => g.status === 'completed').length,
              avg_progress: goals.reduce((sum, g) => sum + g.progress, 0) / goals.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'alerts':
        if (method === 'GET') {
          const alerts = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            title: faker.lorem.words(4),
            message: faker.lorem.sentence(),
            type: faker.helpers.arrayElement(['warning', 'error', 'info', 'success']),
            severity: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
            metric: faker.helpers.arrayElement(['traffic', 'revenue', 'errors', 'performance', 'conversion']),
            threshold: {
              current: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
              limit: faker.number.float({ min: 100, max: 1000, fractionDigits: 2 }),
              operator: faker.helpers.arrayElement(['>', '<', '>=', '<=', '==', '!='])
            },
            isActive: faker.datatype.boolean(),
            isResolved: faker.datatype.boolean(),
            createdAt: faker.date.recent(),
            resolvedAt: faker.datatype.boolean() ? faker.date.recent() : null
          }));
          res.status(200).json({
            data: alerts,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: alerts.filter(a => a.isActive).length,
              critical_count: alerts.filter(a => a.severity === 'critical').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'realtime':
        if (method === 'GET') {
          const realtime = {
            activeUsers: faker.number.int({ min: 100, max: 5000 }),
            pageViews: faker.number.int({ min: 10, max: 500 }),
            events: Array.from({ length: faker.number.int({ min: 5, max: 20 }) }, () => ({
              id: faker.string.uuid(),
              type: faker.helpers.arrayElement(['page_view', 'click', 'purchase', 'signup']),
              userId: faker.string.uuid(),
              timestamp: new Date(Date.now() - faker.number.int({ min: 0, max: 300000 })).toISOString(),
              data: {
                page: faker.internet.url(),
                value: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 })
              }
            })),
            topPages: Array.from({ length: 5 }, () => ({
              url: faker.internet.url(),
              views: faker.number.int({ min: 10, max: 200 }),
              uniqueViews: faker.number.int({ min: 5, max: 150 })
            })),
            serverMetrics: {
              cpu: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
              memory: faker.number.float({ min: 20, max: 90, fractionDigits: 1 }),
              responseTime: faker.number.int({ min: 50, max: 500 })
            },
            timestamp: new Date().toISOString()
          };
          res.status(200).json({
            data: realtime,
            meta: {
              refresh_interval: 5000,
              last_updated: new Date().toISOString()
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'exports':
        if (method === 'GET') {
          const exports = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            type: faker.helpers.arrayElement(['csv', 'json', 'pdf', 'xlsx']),
            status: faker.helpers.arrayElement(['pending', 'processing', 'completed', 'failed']),
            format: faker.helpers.arrayElement(['raw', 'aggregated', 'pivot']),
            size: faker.number.int({ min: 1024, max: 10485760 }),
            records: faker.number.int({ min: 100, max: 100000 }),
            createdBy: faker.person.fullName(),
            createdAt: faker.date.recent(),
            completedAt: faker.datatype.boolean() ? faker.date.recent() : null,
            downloadUrl: faker.datatype.boolean() ? faker.internet.url() : null
          }));
          res.status(200).json({
            data: exports,
            meta: {
              total: count,
              page: page,
              per_page: count,
              completed_count: exports.filter(e => e.status === 'completed').length
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Export created successfully',
            export: {
              id: faker.string.uuid(),
              status: 'pending',
              estimatedTime: faker.number.int({ min: 30, max: 300 })
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