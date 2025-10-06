import { faker } from '@faker-js/faker';
import {
  getRandomUser,
  getRandomEmployee,
  getCompanyEmployees,
  getUserProfile
} from '../shared-data.js';

// Generate employee data with cross-API relationships
function generateEmployee() {
  const user = getRandomUser(); // Link to auth API user
  const startDate = faker.date.past({ years: 10 });
  const salary = faker.number.int({ min: 30000, max: 200000 });

  return {
    id: faker.string.uuid(),
    employeeId: faker.string.alphanumeric(8).toUpperCase(),
    userId: user.id, // Cross-API relationship to auth
    user: user, // Include full user details
    personalInfo: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: faker.phone.number(),
      dateOfBirth: faker.date.birthdate(),
      ssn: faker.string.numeric(9),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      },
      emergencyContact: {
        name: faker.person.fullName(),
        relationship: faker.helpers.arrayElement(['spouse', 'parent', 'sibling', 'friend']),
        phone: faker.phone.number()
      }
    },
    employment: {
      status: faker.helpers.arrayElement(['active', 'inactive', 'terminated', 'on_leave']),
      type: faker.helpers.arrayElement(['full_time', 'part_time', 'contract', 'intern']),
      startDate: startDate,
      endDate: faker.datatype.boolean() ? faker.date.between({ from: startDate, to: new Date() }) : null,
      probationEndDate: faker.date.future({ days: 90 }),
      workLocation: faker.helpers.arrayElement(['office', 'remote', 'hybrid']),
      workSchedule: faker.helpers.arrayElement(['standard', 'flexible', 'shift_work', 'compressed'])
    },
    position: {
      title: faker.person.jobTitle(),
      department: faker.helpers.arrayElement([
        'Engineering', 'Marketing', 'Sales', 'HR', 'Finance',
        'Operations', 'Design', 'Product', 'Legal', 'IT'
      ]),
      level: faker.helpers.arrayElement(['entry', 'junior', 'mid', 'senior', 'lead', 'principal', 'executive']),
      manager: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email()
      },
      directReports: faker.number.int({ min: 0, max: 15 }),
      location: {
        office: faker.helpers.arrayElement(['New York', 'San Francisco', 'London', 'Tokyo', 'Remote']),
        building: faker.string.alpha(1).toUpperCase(),
        floor: faker.number.int({ min: 1, max: 50 }),
        desk: faker.string.alphanumeric(4).toUpperCase()
      }
    },
    compensation: {
      salary: {
        base: salary,
        currency: 'USD',
        frequency: 'annual',
        effectiveDate: faker.date.past()
      },
      bonus: {
        target: salary * faker.number.float({ min: 0.1, max: 0.5 }),
        actual: salary * faker.number.float({ min: 0, max: 0.6 }),
        frequency: faker.helpers.arrayElement(['annual', 'quarterly', 'monthly'])
      },
      equity: {
        shares: faker.number.int({ min: 0, max: 10000 }),
        strikePrice: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
        vestingSchedule: faker.helpers.arrayElement(['4_year_cliff', 'monthly', 'quarterly']),
        vestedShares: faker.number.int({ min: 0, max: 5000 })
      },
      benefits: {
        healthInsurance: faker.datatype.boolean(),
        dentalInsurance: faker.datatype.boolean(),
        visionInsurance: faker.datatype.boolean(),
        life401k: faker.datatype.boolean(),
        ptoAccrual: faker.number.float({ min: 15, max: 30, fractionDigits: 1 }),
        sickLeave: faker.number.int({ min: 5, max: 15 })
      }
    },
    performance: {
      currentRating: faker.helpers.arrayElement(['exceeds', 'meets', 'below', 'unsatisfactory']),
      lastReviewDate: faker.date.past(),
      nextReviewDate: faker.date.future(),
      goals: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['not_started', 'in_progress', 'completed', 'overdue']),
        dueDate: faker.date.future(),
        weight: faker.number.float({ min: 0.1, max: 1, fractionDigits: 1 })
      })),
      skills: faker.helpers.arrayElements([
        'JavaScript', 'Python', 'Leadership', 'Communication', 'Project Management',
        'Data Analysis', 'Design', 'Sales', 'Marketing', 'Finance'
      ], { min: 3, max: 8 })
    },
    attendance: {
      totalPTO: faker.number.int({ min: 15, max: 30 }),
      usedPTO: faker.number.int({ min: 0, max: 20 }),
      sickDaysUsed: faker.number.int({ min: 0, max: 10 }),
      tardiness: faker.number.int({ min: 0, max: 5 }),
      absences: faker.number.int({ min: 0, max: 3 })
    },
    documents: {
      resume: faker.internet.url(),
      offer_letter: faker.internet.url(),
      i9_form: faker.internet.url(),
      w4_form: faker.internet.url(),
      handbook_acknowledgment: faker.internet.url()
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate department data
function generateDepartment() {
  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      'Engineering', 'Product', 'Design', 'Marketing', 'Sales',
      'Customer Success', 'HR', 'Finance', 'Legal', 'Operations', 'IT'
    ]),
    description: faker.lorem.paragraph(),
    head: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      title: faker.person.jobTitle(),
      email: faker.internet.email()
    },
    employeeCount: faker.number.int({ min: 5, max: 200 }),
    budget: {
      annual: faker.number.int({ min: 500000, max: 50000000 }),
      spent: faker.number.int({ min: 100000, max: 40000000 }),
      currency: 'USD'
    },
    location: {
      office: faker.helpers.arrayElement(['New York', 'San Francisco', 'London', 'Remote']),
      floor: faker.number.int({ min: 1, max: 20 })
    },
    teams: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      id: faker.string.uuid(),
      name: faker.lorem.words(2),
      lead: faker.person.fullName(),
      memberCount: faker.number.int({ min: 3, max: 15 })
    })),
    kpis: {
      headcount: faker.number.int({ min: 5, max: 200 }),
      turnoverRate: faker.number.float({ min: 0, max: 25, fractionDigits: 1 }),
      avgSalary: faker.number.int({ min: 60000, max: 150000 }),
      satisfactionScore: faker.number.float({ min: 3, max: 5, fractionDigits: 1 })
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate schedule data
function generateSchedule() {
  return {
    id: faker.string.uuid(),
    employeeId: faker.string.uuid(),
    employeeName: faker.person.fullName(),
    date: faker.date.recent({ days: 30 }),
    shift: {
      type: faker.helpers.arrayElement(['morning', 'afternoon', 'evening', 'night', 'split']),
      startTime: faker.date.recent().toTimeString().slice(0, 5),
      endTime: faker.date.recent().toTimeString().slice(0, 5),
      breakTime: faker.number.int({ min: 30, max: 120 }),
      totalHours: faker.number.float({ min: 4, max: 12, fractionDigits: 2 })
    },
    location: {
      type: faker.helpers.arrayElement(['office', 'remote', 'client_site', 'field']),
      address: faker.location.streetAddress(),
      building: faker.string.alpha(1).toUpperCase(),
      room: faker.string.alphanumeric(4)
    },
    tasks: Array.from({ length: faker.number.int({ min: 2, max: 8 }) }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      estimatedHours: faker.number.float({ min: 0.5, max: 4, fractionDigits: 1 }),
      priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
      status: faker.helpers.arrayElement(['pending', 'in_progress', 'completed', 'cancelled'])
    })),
    status: faker.helpers.arrayElement(['scheduled', 'confirmed', 'in_progress', 'completed', 'no_show']),
    timeTracking: {
      clockIn: faker.date.recent(),
      clockOut: faker.datatype.boolean() ? faker.date.recent() : null,
      actualHours: faker.number.float({ min: 0, max: 12, fractionDigits: 2 }),
      overtime: faker.number.float({ min: 0, max: 4, fractionDigits: 2 }),
      breaks: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
        start: faker.date.recent(),
        end: faker.date.recent(),
        duration: faker.number.int({ min: 15, max: 60 })
      }))
    },
    manager: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      approved: faker.datatype.boolean(),
      approvalDate: faker.date.recent()
    },
    notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate task data
function generateTask() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 4, max: 10 }),
    description: faker.lorem.paragraph(),
    type: faker.helpers.arrayElement(['project', 'maintenance', 'meeting', 'training', 'review']),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
    status: faker.helpers.arrayElement(['todo', 'in_progress', 'review', 'completed', 'cancelled']),
    assignee: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar()
    },
    reporter: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email()
    },
    project: {
      id: faker.string.uuid(),
      name: faker.lorem.words(3),
      key: faker.string.alpha(3).toUpperCase()
    },
    dates: {
      created: faker.date.past(),
      started: faker.datatype.boolean() ? faker.date.recent() : null,
      due: faker.date.future(),
      completed: faker.datatype.boolean() ? faker.date.recent() : null,
      estimatedHours: faker.number.float({ min: 1, max: 40, fractionDigits: 1 }),
      loggedHours: faker.number.float({ min: 0, max: 35, fractionDigits: 1 })
    },
    dependencies: faker.helpers.multiple(() => ({
      id: faker.string.uuid(),
      title: faker.lorem.words(4),
      type: faker.helpers.arrayElement(['blocks', 'blocked_by', 'relates_to'])
    }), { count: { min: 0, max: 3 } }),
    labels: faker.helpers.arrayElements([
      'bug', 'feature', 'improvement', 'documentation', 'testing', 'urgent'
    ], { min: 0, max: 4 }),
    comments: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => ({
      id: faker.string.uuid(),
      author: faker.person.fullName(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.recent()
    })),
    attachments: faker.helpers.multiple(() => ({
      id: faker.string.uuid(),
      filename: faker.system.fileName(),
      url: faker.internet.url(),
      size: faker.number.int({ min: 1024, max: 10485760 })
    }), { count: { min: 0, max: 3 } }),
    worklog: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
      id: faker.string.uuid(),
      employee: faker.person.fullName(),
      hours: faker.number.float({ min: 0.5, max: 8, fractionDigits: 1 }),
      description: faker.lorem.sentence(),
      date: faker.date.recent()
    })),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate location data
function generateLocation() {
  return {
    id: faker.string.uuid(),
    name: faker.location.city(),
    type: faker.helpers.arrayElement(['city', 'landmark', 'business', 'residence', 'poi']),
    coordinates: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      altitude: faker.number.float({ min: 0, max: 8848, fractionDigits: 2 })
    },
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      countryCode: faker.location.countryCode()
    },
    timezone: faker.location.timeZone(),
    population: faker.number.int({ min: 1000, max: 10000000 }),
    area: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
    elevation: faker.number.int({ min: -100, max: 5000 }),
    climate: faker.helpers.arrayElement(['tropical', 'temperate', 'arid', 'continental', 'polar']),
    demographics: {
      averageAge: faker.number.float({ min: 25, max: 65, fractionDigits: 1 }),
      medianIncome: faker.number.int({ min: 30000, max: 150000 }),
      educationLevel: faker.helpers.arrayElement(['high_school', 'college', 'graduate', 'postgraduate'])
    },
    amenities: faker.helpers.arrayElements([
      'hospital', 'school', 'park', 'restaurant', 'shopping_mall',
      'airport', 'train_station', 'bus_stop', 'gym', 'library'
    ], { min: 2, max: 8 }),
    tags: faker.helpers.arrayElements([
      'urban', 'rural', 'coastal', 'mountainous', 'historic', 'modern', 'tourist_destination'
    ], { min: 1, max: 4 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate weather data
function generateWeather() {
  const temperature = faker.number.float({ min: -30, max: 45, fractionDigits: 1 });
  return {
    id: faker.string.uuid(),
    locationId: faker.string.uuid(),
    coordinates: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude()
    },
    current: {
      temperature: temperature,
      feelsLike: temperature + faker.number.float({ min: -5, max: 5, fractionDigits: 1 }),
      humidity: faker.number.int({ min: 20, max: 100 }),
      pressure: faker.number.int({ min: 950, max: 1050 }),
      visibility: faker.number.float({ min: 0.1, max: 25, fractionDigits: 1 }),
      uvIndex: faker.number.int({ min: 0, max: 11 }),
      windSpeed: faker.number.float({ min: 0, max: 50, fractionDigits: 1 }),
      windDirection: faker.number.int({ min: 0, max: 360 }),
      condition: faker.helpers.arrayElement([
        'sunny', 'cloudy', 'partly_cloudy', 'rainy', 'stormy', 'snowy', 'foggy', 'windy'
      ]),
      icon: faker.helpers.arrayElement(['☀️', '⛅', '☁️', '🌧️', '⛈️', '❄️', '🌫️', '💨'])
    },
    forecast: Array.from({ length: 7 }, (_, index) => ({
      date: faker.date.future({ days: index + 1 }),
      high: faker.number.float({ min: temperature, max: temperature + 15, fractionDigits: 1 }),
      low: faker.number.float({ min: temperature - 10, max: temperature, fractionDigits: 1 }),
      condition: faker.helpers.arrayElement([
        'sunny', 'cloudy', 'partly_cloudy', 'rainy', 'stormy', 'snowy'
      ]),
      precipitation: faker.number.float({ min: 0, max: 50, fractionDigits: 1 }),
      humidity: faker.number.int({ min: 30, max: 90 })
    })),
    alerts: faker.helpers.multiple(() => ({
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(['severe_weather', 'flood', 'heat', 'cold', 'wind', 'storm']),
      severity: faker.helpers.arrayElement(['minor', 'moderate', 'severe', 'extreme']),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      startTime: faker.date.recent(),
      endTime: faker.date.future()
    }), { count: { min: 0, max: 3 } }),
    provider: faker.helpers.arrayElement(['OpenWeather', 'AccuWeather', 'Weather.gov']),
    lastUpdated: faker.date.recent(),
    createdAt: faker.date.recent()
  };
}

// Generate map data
function generateMapData() {
  return {
    id: faker.string.uuid(),
    name: faker.location.city(),
    bounds: {
      northeast: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude()
      },
      southwest: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude()
      }
    },
    center: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude()
    },
    zoom: faker.number.int({ min: 1, max: 20 }),
    mapType: faker.helpers.arrayElement(['roadmap', 'satellite', 'hybrid', 'terrain']),
    layers: faker.helpers.arrayElements([
      'traffic', 'transit', 'bike_lanes', 'points_of_interest', 'weather'
    ], { min: 0, max: 3 }),
    markers: Array.from({ length: faker.number.int({ min: 1, max: 20 }) }, () => ({
      id: faker.string.uuid(),
      position: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude()
      },
      title: faker.company.name(),
      description: faker.lorem.sentence(),
      type: faker.helpers.arrayElement(['restaurant', 'hotel', 'gas_station', 'hospital', 'school']),
      icon: faker.helpers.arrayElement(['🍽️', '🏨', '⛽', '🏥', '🏫']),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 0, max: 1000 })
    })),
    routes: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
      id: faker.string.uuid(),
      waypoints: Array.from({ length: faker.number.int({ min: 2, max: 10 }) }, () => ({
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude()
      })),
      distance: faker.number.float({ min: 1, max: 500, fractionDigits: 2 }),
      duration: faker.number.int({ min: 5, max: 480 }),
      mode: faker.helpers.arrayElement(['driving', 'walking', 'cycling', 'transit']),
      traffic: faker.helpers.arrayElement(['light', 'moderate', 'heavy'])
    })),
    createdAt: faker.date.past(),
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
      case 'employees':
        if (method === 'GET') {
          const employees = Array.from({ length: count }, () => generateEmployee());
          res.status(200).json({
            data: employees,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: employees.filter(e => e.employment.status === 'active').length,
              avg_salary: employees.reduce((sum, e) => sum + e.compensation.salary.base, 0) / employees.length,
              by_department: employees.reduce((acc, e) => {
                acc[e.position.department] = (acc[e.position.department] || 0) + 1;
                return acc;
              }, {})
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            employee: generateEmployee()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'departments':
        if (method === 'GET') {
          const departments = Array.from({ length: count }, () => generateDepartment());
          res.status(200).json({
            data: departments,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_employees: departments.reduce((sum, d) => sum + d.employeeCount, 0),
              total_budget: departments.reduce((sum, d) => sum + d.budget.annual, 0),
              avg_satisfaction: departments.reduce((sum, d) => sum + d.kpis.satisfactionScore, 0) / departments.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'schedules':
        if (method === 'GET') {
          const schedules = Array.from({ length: count }, () => generateSchedule());
          res.status(200).json({
            data: schedules,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_hours: schedules.reduce((sum, s) => sum + s.shift.totalHours, 0),
              completed_count: schedules.filter(s => s.status === 'completed').length,
              overtime_hours: schedules.reduce((sum, s) => sum + s.timeTracking.overtime, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'tasks':
        if (method === 'GET') {
          const tasks = Array.from({ length: count }, () => generateTask());
          res.status(200).json({
            data: tasks,
            meta: {
              total: count,
              page: page,
              per_page: count,
              by_status: {
                todo: tasks.filter(t => t.status === 'todo').length,
                in_progress: tasks.filter(t => t.status === 'in_progress').length,
                completed: tasks.filter(t => t.status === 'completed').length
              },
              total_estimated_hours: tasks.reduce((sum, t) => sum + t.dates.estimatedHours, 0),
              total_logged_hours: tasks.reduce((sum, t) => sum + t.dates.loggedHours, 0)
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task: generateTask()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'payroll':
        if (method === 'GET') {
          const payroll = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            employeeId: faker.string.uuid(),
            employeeName: faker.person.fullName(),
            period: {
              start: faker.date.recent({ days: 30 }),
              end: faker.date.recent(),
              type: faker.helpers.arrayElement(['weekly', 'biweekly', 'monthly'])
            },
            earnings: {
              baseSalary: faker.number.float({ min: 3000, max: 15000, fractionDigits: 2 }),
              overtime: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
              bonuses: faker.number.float({ min: 0, max: 2000, fractionDigits: 2 }),
              commissions: faker.number.float({ min: 0, max: 1500, fractionDigits: 2 })
            },
            deductions: {
              taxes: faker.number.float({ min: 500, max: 3000, fractionDigits: 2 }),
              insurance: faker.number.float({ min: 100, max: 500, fractionDigits: 2 }),
              retirement: faker.number.float({ min: 200, max: 800, fractionDigits: 2 }),
              other: faker.number.float({ min: 0, max: 200, fractionDigits: 2 })
            },
            netPay: faker.number.float({ min: 2000, max: 12000, fractionDigits: 2 }),
            status: faker.helpers.arrayElement(['pending', 'processed', 'paid']),
            paymentMethod: faker.helpers.arrayElement(['direct_deposit', 'check', 'cash']),
            paidAt: faker.datatype.boolean() ? faker.date.recent() : null
          }));
          res.status(200).json({
            data: payroll,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_payroll: payroll.reduce((sum, p) => sum + p.netPay, 0),
              processed_count: payroll.filter(p => p.status === 'processed').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'benefits':
        if (method === 'GET') {
          const benefits = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            employeeId: faker.string.uuid(),
            employeeName: faker.person.fullName(),
            type: faker.helpers.arrayElement(['health', 'dental', 'vision', 'life', 'disability', 'retirement']),
            provider: faker.company.name(),
            plan: faker.lorem.words(2),
            coverage: {
              employee: faker.number.float({ min: 50, max: 100, fractionDigits: 1 }),
              employer: faker.number.float({ min: 0, max: 50, fractionDigits: 1 }),
              dependents: faker.datatype.boolean()
            },
            premium: {
              employee: faker.number.float({ min: 20, max: 200, fractionDigits: 2 }),
              employer: faker.number.float({ min: 50, max: 400, fractionDigits: 2 })
            },
            enrollmentDate: faker.date.past(),
            renewalDate: faker.date.future(),
            status: faker.helpers.arrayElement(['active', 'pending', 'terminated']),
            claims: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
              id: faker.string.uuid(),
              date: faker.date.recent(),
              amount: faker.number.float({ min: 50, max: 2000, fractionDigits: 2 }),
              status: faker.helpers.arrayElement(['approved', 'pending', 'denied'])
            }))
          }));
          res.status(200).json({
            data: benefits,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: benefits.filter(b => b.status === 'active').length,
              total_premiums: benefits.reduce((sum, b) => sum + b.premium.employee, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'performance':
        if (method === 'GET') {
          const performance = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            employeeId: faker.string.uuid(),
            employeeName: faker.person.fullName(),
            period: {
              start: faker.date.recent({ days: 90 }),
              end: faker.date.recent(),
              type: faker.helpers.arrayElement(['quarterly', 'annual'])
            },
            ratings: {
              overall: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
              productivity: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
              quality: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
              teamwork: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
              communication: faker.number.float({ min: 1, max: 5, fractionDigits: 1 })
            },
            goals: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => ({
              id: faker.string.uuid(),
              title: faker.lorem.words(3),
              description: faker.lorem.sentence(),
              target: faker.lorem.words(2),
              progress: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
              status: faker.helpers.arrayElement(['not_started', 'in_progress', 'completed', 'overdue'])
            })),
            feedback: {
              manager: faker.lorem.paragraph(),
              self: faker.lorem.paragraph(),
              peers: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.lorem.paragraph())
            },
            development: {
              strengths: faker.helpers.arrayElements(['leadership', 'technical_skills', 'communication', 'problem_solving'], { min: 1, max: 3 }),
              areasForImprovement: faker.helpers.arrayElements(['time_management', 'delegation', 'public_speaking'], { min: 1, max: 2 }),
              trainingRecommendations: faker.helpers.arrayElements(['leadership_training', 'technical_certification', 'communication_workshop'], { min: 1, max: 3 })
            },
            compensation: {
              currentSalary: faker.number.float({ min: 40000, max: 150000, fractionDigits: 2 }),
              recommendedIncrease: faker.number.float({ min: 0, max: 15, fractionDigits: 1 }),
              bonus: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 })
            },
            status: faker.helpers.arrayElement(['draft', 'submitted', 'reviewed', 'approved']),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: performance,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_rating: performance.reduce((sum, p) => sum + p.ratings.overall, 0) / performance.length,
              completed_count: performance.filter(p => p.status === 'approved').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'recruitment':
        if (method === 'GET') {
          const recruitment = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            position: faker.person.jobTitle(),
            department: faker.commerce.department(),
            status: faker.helpers.arrayElement(['open', 'closed', 'on_hold', 'filled']),
            priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
            applicants: faker.number.int({ min: 0, max: 200 }),
            interviews: faker.number.int({ min: 0, max: 50 }),
            offers: faker.number.int({ min: 0, max: 10 }),
            hires: faker.number.int({ min: 0, max: 5 }),
            postedAt: faker.date.past(),
            deadline: faker.date.future(),
            requirements: {
              experience: faker.lorem.sentence(),
              skills: faker.helpers.arrayElements(['JavaScript', 'Python', 'React', 'Node.js', 'SQL'], { min: 2, max: 5 }),
              education: faker.helpers.arrayElement(['high_school', 'bachelors', 'masters', 'phd'])
            },
            salary: {
              min: faker.number.int({ min: 30000, max: 80000 }),
              max: faker.number.int({ min: 60000, max: 200000 }),
              currency: 'USD'
            },
            location: faker.helpers.arrayElement(['remote', 'onsite', 'hybrid']),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: recruitment,
            meta: {
              total: count,
              page: page,
              per_page: count,
              open_positions: recruitment.filter(r => r.status === 'open').length,
              total_applicants: recruitment.reduce((sum, r) => sum + r.applicants, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'attendance':
        if (method === 'GET') {
          const attendance = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            employeeId: faker.string.uuid(),
            employeeName: faker.person.fullName(),
            date: faker.date.recent(),
            checkIn: faker.date.recent(),
            checkOut: faker.datatype.boolean() ? faker.date.recent() : null,
            status: faker.helpers.arrayElement(['present', 'absent', 'late', 'half_day', 'vacation', 'sick_leave']),
            hoursWorked: faker.number.float({ min: 0, max: 12, fractionDigits: 2 }),
            overtime: faker.number.float({ min: 0, max: 4, fractionDigits: 2 }),
            breaks: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
              start: faker.date.recent(),
              end: faker.date.recent(),
              duration: faker.number.int({ min: 15, max: 60 })
            })),
            location: faker.helpers.arrayElement(['office', 'remote', 'client_site', 'home']),
            notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
            approved: faker.datatype.boolean(),
            approvedBy: faker.datatype.boolean() ? faker.person.fullName() : null
          }));
          res.status(200).json({
            data: attendance,
            meta: {
              total: count,
              page: page,
              per_page: count,
              present_count: attendance.filter(a => a.status === 'present').length,
              total_hours: attendance.reduce((sum, a) => sum + a.hoursWorked, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'training':
        if (method === 'GET') {
          const training = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            title: faker.lorem.words(3),
            description: faker.lorem.paragraph(),
            type: faker.helpers.arrayElement(['online', 'in_person', 'workshop', 'conference', 'certification']),
            category: faker.helpers.arrayElement(['technical', 'soft_skills', 'leadership', 'compliance', 'safety']),
            instructor: faker.person.fullName(),
            duration: faker.number.int({ min: 1, max: 40 }),
            cost: faker.number.float({ min: 0, max: 2000, fractionDigits: 2 }),
            maxParticipants: faker.number.int({ min: 5, max: 50 }),
            enrolledCount: faker.number.int({ min: 0, max: 50 }),
            status: faker.helpers.arrayElement(['upcoming', 'in_progress', 'completed', 'cancelled']),
            schedule: {
              startDate: faker.date.future(),
              endDate: faker.date.future(),
              sessions: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => ({
                date: faker.date.future(),
                startTime: faker.helpers.arrayElement(['09:00', '10:00', '14:00', '15:00']),
                endTime: faker.helpers.arrayElement(['12:00', '13:00', '17:00', '18:00']),
                location: faker.helpers.arrayElement(['online', 'conference_room_a', 'training_center'])
              }))
            },
            prerequisites: faker.helpers.arrayElements(['basic_computer_skills', 'prior_experience', 'manager_approval'], { min: 0, max: 2 }),
            materials: faker.helpers.arrayElements(['handbook', 'slides', 'videos', 'exercises'], { min: 1, max: 4 }),
            completion: {
              certificate: faker.datatype.boolean(),
              assessment: faker.datatype.boolean(),
              passingScore: faker.number.int({ min: 70, max: 90 })
            },
            ratings: {
              average: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
              count: faker.number.int({ min: 0, max: 50 })
            },
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: training,
            meta: {
              total: count,
              page: page,
              per_page: count,
              upcoming_count: training.filter(t => t.status === 'upcoming').length,
              avg_rating: training.filter(t => t.ratings.count > 0).reduce((sum, t) => sum + t.ratings.average, 0) / training.filter(t => t.ratings.count > 0).length || 0
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'locations':
        if (method === 'GET') {
          const locations = Array.from({ length: count }, () => generateLocation());
          res.status(200).json({
            data: locations,
            meta: {
              total: count,
              page: page,
              per_page: count,
              by_type: {
                cities: locations.filter(l => l.type === 'city').length,
                businesses: locations.filter(l => l.type === 'business').length,
                landmarks: locations.filter(l => l.type === 'landmark').length
              }
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'weather':
        if (method === 'GET') {
          const weather = Array.from({ length: count }, () => generateWeather());
          res.status(200).json({
            data: weather,
            meta: {
              total: count,
              page: page,
              per_page: count,
              alerts_count: weather.reduce((sum, w) => sum + w.alerts.length, 0),
              avg_temperature: weather.reduce((sum, w) => sum + w.current.temperature, 0) / weather.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'maps':
        if (method === 'GET') {
          const maps = Array.from({ length: count }, () => generateMapData());
          res.status(200).json({
            data: maps,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_markers: maps.reduce((sum, m) => sum + m.markers.length, 0),
              total_routes: maps.reduce((sum, m) => sum + m.routes.length, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'geocoding':
        if (method === 'GET') {
          const geocoding = Array.from({ length: count }, () => ({
            query: faker.location.streetAddress(),
            results: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
              address: faker.location.streetAddress(),
              coordinates: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              },
              type: faker.helpers.arrayElement(['house', 'street', 'city', 'poi', 'postal_code']),
              confidence: faker.number.float({ min: 0.5, max: 1.0, fractionDigits: 2 }),
              components: {
                house_number: faker.string.numeric(3),
                street: faker.location.street(),
                city: faker.location.city(),
                state: faker.location.state(),
                postal_code: faker.location.zipCode(),
                country: faker.location.country()
              }
            })),
            status: 'success',
            total_results: faker.number.int({ min: 1, max: 10 })
          }));
          res.status(200).json({
            data: geocoding,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_results_per_query: geocoding.reduce((sum, g) => sum + g.total_results, 0) / geocoding.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'routing':
        if (method === 'GET') {
          const routing = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            origin: {
              address: faker.location.streetAddress(),
              coordinates: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              }
            },
            destination: {
              address: faker.location.streetAddress(),
              coordinates: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              }
            },
            waypoints: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
              address: faker.location.streetAddress(),
              coordinates: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              }
            })),
            mode: faker.helpers.arrayElement(['driving', 'walking', 'cycling', 'transit']),
            distance: {
              value: faker.number.int({ min: 1000, max: 100000 }),
              text: faker.number.int({ min: 1, max: 100 }) + ' km'
            },
            duration: {
              value: faker.number.int({ min: 600, max: 36000 }),
              text: faker.number.int({ min: 10, max: 600 }) + ' mins'
            },
            steps: Array.from({ length: faker.number.int({ min: 5, max: 20 }) }, () => ({
              instruction: faker.lorem.sentence(),
              distance: {
                value: faker.number.int({ min: 100, max: 5000 }),
                text: faker.number.int({ min: 0.1, max: 5, fractionDigits: 1 }) + ' km'
              },
              duration: {
                value: faker.number.int({ min: 60, max: 1800 }),
                text: faker.number.int({ min: 1, max: 30 }) + ' mins'
              },
              coordinates: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              }
            })),
            bounds: {
              northeast: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              },
              southwest: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              }
            },
            polyline: faker.string.alphanumeric(100),
            traffic: faker.helpers.arrayElement(['light', 'moderate', 'heavy', 'severe']),
            tolls: faker.datatype.boolean(),
            restrictions: faker.helpers.arrayElements(['tolls', 'highways', 'ferries'], { min: 0, max: 2 })
          }));
          res.status(200).json({
            data: routing,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_distance: routing.reduce((sum, r) => sum + r.distance.value, 0) / routing.length,
              avg_duration: routing.reduce((sum, r) => sum + r.duration.value, 0) / routing.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'places':
        if (method === 'GET') {
          const places = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.company.name(),
            type: faker.helpers.arrayElement(['restaurant', 'hotel', 'store', 'park', 'museum', 'hospital', 'school', 'bank', 'gas_station', 'pharmacy']),
            address: faker.location.streetAddress(),
            coordinates: {
              latitude: faker.location.latitude(),
              longitude: faker.location.longitude()
            },
            rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
            reviews: faker.number.int({ min: 0, max: 1000 }),
            price_level: faker.number.int({ min: 1, max: 4 }),
            photos: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => ({
              url: faker.image.url(),
              width: faker.number.int({ min: 400, max: 1920 }),
              height: faker.number.int({ min: 300, max: 1080 })
            })),
            opening_hours: {
              open_now: faker.datatype.boolean(),
              periods: Array.from({ length: 7 }, (_, index) => ({
                day: index,
                open: faker.helpers.arrayElement(['06:00', '07:00', '08:00', '09:00']),
                close: faker.helpers.arrayElement(['18:00', '19:00', '20:00', '21:00', '22:00'])
              })),
              weekday_text: [
                'Monday: 9:00 AM – 6:00 PM',
                'Tuesday: 9:00 AM – 6:00 PM',
                'Wednesday: 9:00 AM – 6:00 PM',
                'Thursday: 9:00 AM – 6:00 PM',
                'Friday: 9:00 AM – 6:00 PM',
                'Saturday: 9:00 AM – 6:00 PM',
                'Sunday: Closed'
              ]
            },
            contact: {
              phone: faker.phone.number(),
              website: faker.internet.url(),
              email: faker.internet.email()
            },
            amenities: faker.helpers.arrayElements([
              'wifi', 'parking', 'wheelchair_accessible', 'credit_cards',
              'delivery', 'takeout', 'reservations', 'outdoor_seating'
            ], { min: 2, max: 6 }),
            reviews_data: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
              author: faker.person.fullName(),
              rating: faker.number.int({ min: 1, max: 5 }),
              text: faker.lorem.paragraph(),
              time: faker.date.recent(),
              language: 'en'
            }))
          }));
          res.status(200).json({
            data: places,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_rating: places.reduce((sum, p) => sum + p.rating, 0) / places.length,
              open_now_count: places.filter(p => p.opening_hours.open_now).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'timezone':
        if (method === 'GET') {
          const timezones = Array.from({ length: count }, () => ({
            location: {
              latitude: faker.location.latitude(),
              longitude: faker.location.longitude()
            },
            timezone: {
              id: faker.location.timeZone(),
              name: faker.helpers.arrayElement(['Eastern Standard Time', 'Pacific Standard Time', 'Central European Time', 'Japan Standard Time']),
              offset: faker.number.int({ min: -12, max: 12 }),
              dst_offset: faker.number.int({ min: 0, max: 1 }),
              raw_offset: faker.number.int({ min: -43200, max: 43200 })
            },
            current_time: new Date().toISOString(),
            next_dst_transition: faker.datatype.boolean() ? faker.date.future() : null,
            status: 'OK'
          }));
          res.status(200).json({
            data: timezones,
            meta: {
              total: count,
              page: page,
              per_page: count,
              unique_timezones: [...new Set(timezones.map(t => t.timezone.id))].length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'elevation':
        if (method === 'GET') {
          const elevations = Array.from({ length: count }, () => ({
            location: {
              latitude: faker.location.latitude(),
              longitude: faker.location.longitude()
            },
            elevation: faker.number.float({ min: -100, max: 8848, fractionDigits: 2 }),
            resolution: faker.number.float({ min: 0.1, max: 100, fractionDigits: 1 }),
            status: 'OK'
          }));
          res.status(200).json({
            data: elevations,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_elevation: elevations.reduce((sum, e) => sum + e.elevation, 0) / elevations.length,
              max_elevation: Math.max(...elevations.map(e => e.elevation)),
              min_elevation: Math.min(...elevations.map(e => e.elevation))
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'traffic':
        if (method === 'GET') {
          const traffic = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            location: {
              latitude: faker.location.latitude(),
              longitude: faker.location.longitude(),
              address: faker.location.streetAddress()
            },
            conditions: {
              speed: faker.number.float({ min: 0, max: 120, fractionDigits: 1 }),
              speed_limit: faker.number.int({ min: 30, max: 100 }),
              congestion: faker.helpers.arrayElement(['light', 'moderate', 'heavy', 'severe']),
              incidents: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
                type: faker.helpers.arrayElement(['accident', 'construction', 'road_closure', 'weather']),
                severity: faker.helpers.arrayElement(['minor', 'major', 'critical']),
                description: faker.lorem.sentence(),
                start_time: faker.date.recent(),
                estimated_end_time: faker.date.future(),
                delay: faker.number.int({ min: 5, max: 120 })
              }))
            },
            flow: {
              current: faker.number.int({ min: 10, max: 100 }),
              typical: faker.number.int({ min: 20, max: 100 }),
              trend: faker.helpers.arrayElement(['increasing', 'decreasing', 'stable'])
            },
            predictions: {
              next_hour: faker.helpers.arrayElement(['light', 'moderate', 'heavy']),
              next_3_hours: faker.helpers.arrayElement(['light', 'moderate', 'heavy']),
              confidence: faker.number.float({ min: 0.5, max: 0.95, fractionDigits: 2 })
            },
            last_updated: faker.date.recent(),
            data_source: faker.helpers.arrayElement(['government', 'private', 'crowdsourced'])
          }));
          res.status(200).json({
            data: traffic,
            meta: {
              total: count,
              page: page,
              per_page: count,
              incidents_count: traffic.reduce((sum, t) => sum + t.conditions.incidents.length, 0),
              avg_speed: traffic.reduce((sum, t) => sum + t.conditions.speed, 0) / traffic.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'geofencing':
        if (method === 'GET') {
          const geofences = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            type: faker.helpers.arrayElement(['circle', 'polygon', 'rectangle']),
            geometry: {
              center: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              },
              radius: faker.number.int({ min: 100, max: 5000 }),
              coordinates: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => ({
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              }))
            },
            properties: {
              area: faker.number.float({ min: 1000, max: 1000000, fractionDigits: 2 }),
              perimeter: faker.number.float({ min: 100, max: 10000, fractionDigits: 2 })
            },
            triggers: faker.helpers.arrayElements([
              'enter', 'exit', 'dwell', 'cross'
            ], { min: 1, max: 4 }),
            notifications: {
              email: faker.datatype.boolean(),
              sms: faker.datatype.boolean(),
              webhook: faker.datatype.boolean()
            },
            active: faker.datatype.boolean(),
            createdBy: faker.person.fullName(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: geofences,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: geofences.filter(g => g.active).length,
              avg_area: geofences.reduce((sum, g) => sum + g.properties.area, 0) / geofences.length
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