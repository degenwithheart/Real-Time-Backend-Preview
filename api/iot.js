import { faker } from '@faker-js/faker';

// Generate IoT device data
function generateIoTDevice() {
  const deviceTypes = ['smart_bulb', 'thermostat', 'security_camera', 'smart_lock', 'motion_sensor', 'smoke_detector', 'smart_plug', 'weather_station'];
  const deviceType = faker.helpers.arrayElement(deviceTypes);

  return {
    id: faker.string.uuid(),
    deviceId: faker.string.alphanumeric(12).toUpperCase(),
    name: faker.commerce.productName(),
    type: deviceType,
    model: faker.string.alphanumeric(8).toUpperCase(),
    manufacturer: faker.company.name(),
    firmware: {
      version: faker.system.semver(),
      lastUpdated: faker.date.recent(),
      autoUpdate: faker.datatype.boolean()
    },
    status: {
      online: faker.datatype.boolean(),
      battery: faker.number.int({ min: 0, max: 100 }),
      signal: faker.number.int({ min: -100, max: 0 }),
      lastSeen: faker.date.recent(),
      uptime: faker.number.int({ min: 0, max: 31536000 }) // seconds
    },
    location: {
      room: faker.helpers.arrayElement(['living_room', 'kitchen', 'bedroom', 'bathroom', 'garage', 'office', 'outdoor']),
      coordinates: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude()
      },
      floor: faker.number.int({ min: 1, max: 3 })
    },
    capabilities: faker.helpers.arrayElements([
      'wifi', 'bluetooth', 'zigbee', 'zwave', 'cellular', 'gps', 'camera', 'microphone', 'speaker'
    ], { min: 2, max: 5 }),
    settings: {
      schedule: faker.datatype.boolean(),
      automation: faker.datatype.boolean(),
      notifications: faker.datatype.boolean(),
      privacy: faker.helpers.arrayElement(['public', 'private', 'shared'])
    },
    owner: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email()
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate sensor data
function generateSensor() {
  const sensorTypes = ['temperature', 'humidity', 'motion', 'light', 'sound'];
  const sensorType = faker.helpers.arrayElement(sensorTypes);

  let value, unit, range;
  switch (sensorType) {
    case 'temperature':
      value = faker.number.float({ min: -10, max: 50, fractionDigits: 1 });
      unit = '°C';
      range = { min: -20, max: 60 };
      break;
    case 'humidity':
      value = faker.number.int({ min: 0, max: 100 });
      unit = '%';
      range = { min: 0, max: 100 };
      break;
    case 'motion':
      value = faker.datatype.boolean();
      unit = 'detected';
      range = { min: false, max: true };
      break;
    case 'light':
      value = faker.number.int({ min: 0, max: 100000 });
      unit = 'lux';
      range = { min: 0, max: 100000 };
      break;
    case 'sound':
      value = faker.number.int({ min: 20, max: 120 });
      unit = 'dB';
      range = { min: 0, max: 140 };
      break;
  }

  return {
    id: faker.string.uuid(),
    sensorId: faker.string.alphanumeric(10).toUpperCase(),
    deviceId: faker.string.uuid(),
    type: sensorType,
    name: `${sensorType.charAt(0).toUpperCase() + sensorType.slice(1)} Sensor`,
    reading: {
      value: value,
      unit: unit,
      timestamp: faker.date.recent(),
      quality: faker.helpers.arrayElement(['excellent', 'good', 'fair', 'poor'])
    },
    range: range,
    threshold: {
      min: range.min + faker.number.int({ min: 5, max: 20 }),
      max: range.max - faker.number.int({ min: 5, max: 20 }),
      alerts: faker.datatype.boolean()
    },
    calibration: {
      lastCalibrated: faker.date.past(),
      nextCalibration: faker.date.future(),
      accuracy: faker.number.float({ min: 0.95, max: 1.0, fractionDigits: 3 })
    },
    location: {
      device: faker.commerce.productName(),
      room: faker.helpers.arrayElement(['living_room', 'kitchen', 'bedroom', 'bathroom', 'garage'])
    },
    status: faker.helpers.arrayElement(['active', 'inactive', 'maintenance', 'error'])
  };
}

// Generate telemetry data
function generateTelemetry() {
  return {
    id: faker.string.uuid(),
    deviceId: faker.string.uuid(),
    timestamp: faker.date.recent(),
    sensors: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      sensorId: faker.string.uuid(),
      type: faker.helpers.arrayElement(['temperature', 'humidity', 'motion', 'light', 'pressure']),
      value: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
      unit: faker.helpers.arrayElement(['°C', '%', 'lux', 'hPa', 'detected'])
    })),
    system: {
      cpu: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      memory: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      storage: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      battery: faker.number.int({ min: 0, max: 100 }),
      temperature: faker.number.float({ min: 20, max: 80, fractionDigits: 1 })
    },
    network: {
      signal: faker.number.int({ min: -100, max: 0 }),
      latency: faker.number.int({ min: 1, max: 500 }),
      bandwidth: faker.number.int({ min: 1, max: 100 }),
      protocol: faker.helpers.arrayElement(['wifi', 'ethernet', 'cellular', 'bluetooth'])
    },
    events: faker.helpers.multiple(() => ({
      type: faker.helpers.arrayElement(['motion_detected', 'button_pressed', 'power_outage', 'connection_lost']),
      timestamp: faker.date.recent(),
      data: faker.lorem.words(3)
    }), { count: { min: 0, max: 3 } }),
    location: faker.datatype.boolean() ? {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      accuracy: faker.number.int({ min: 1, max: 50 })
    } : null
  };
}

// Generate alert data
function generateAlert() {
  return {
    id: faker.string.uuid(),
    deviceId: faker.string.uuid(),
    type: faker.helpers.arrayElement(['security', 'maintenance', 'system', 'environmental', 'connectivity']),
    severity: faker.helpers.arrayElement(['critical', 'high', 'medium', 'low', 'info']),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    sensor: {
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(['temperature', 'motion', 'smoke', 'water', 'door']),
      value: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
      threshold: faker.number.float({ min: 0, max: 100, fractionDigits: 2 })
    },
    location: {
      device: faker.commerce.productName(),
      room: faker.helpers.arrayElement(['living_room', 'kitchen', 'bedroom', 'bathroom'])
    },
    status: faker.helpers.arrayElement(['active', 'acknowledged', 'resolved', 'dismissed']),
    acknowledgedBy: faker.datatype.boolean() ? {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      timestamp: faker.date.recent()
    } : null,
    resolvedAt: faker.datatype.boolean() ? faker.date.recent() : null,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  };
}

// Generate automation rule data
function generateAutomation() {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    enabled: faker.datatype.boolean(),
    trigger: {
      type: faker.helpers.arrayElement(['time', 'sensor', 'device', 'location', 'schedule']),
      condition: faker.helpers.arrayElement(['equals', 'greater_than', 'less_than', 'between', 'contains']),
      value: faker.datatype.boolean() ? faker.number.int({ min: 0, max: 100 }) : faker.lorem.word(),
      deviceId: faker.string.uuid(),
      sensorId: faker.string.uuid()
    },
    actions: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      type: faker.helpers.arrayElement(['turn_on', 'turn_off', 'set_value', 'send_notification', 'play_sound']),
      deviceId: faker.string.uuid(),
      value: faker.number.int({ min: 0, max: 100 }),
      delay: faker.number.int({ min: 0, max: 300 })
    })),
    schedule: faker.datatype.boolean() ? {
      days: faker.helpers.arrayElements(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], { min: 1, max: 7 }),
      time: faker.date.recent().toTimeString().slice(0, 5),
      timezone: faker.location.timeZone()
    } : null,
    conditions: faker.helpers.multiple(() => ({
      type: faker.helpers.arrayElement(['time_range', 'location', 'weather', 'presence']),
      operator: faker.helpers.arrayElement(['and', 'or']),
      value: faker.lorem.word()
    }), { count: { min: 0, max: 2 } }),
    owner: {
      id: faker.string.uuid(),
      name: faker.person.fullName()
    },
    stats: {
      triggered: faker.number.int({ min: 0, max: 1000 }),
      successful: faker.number.int({ min: 0, max: 1000 }),
      failed: faker.number.int({ min: 0, max: 100 })
    },
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
      case 'devices':
        if (method === 'GET') {
          const devices = Array.from({ length: count }, () => generateIoTDevice());
          res.status(200).json({
            data: devices,
            meta: {
              total: count,
              page: page,
              per_page: count,
              online_count: devices.filter(d => d.status.online).length,
              by_type: devices.reduce((acc, d) => {
                acc[d.type] = (acc[d.type] || 0) + 1;
                return acc;
              }, {}),
              avg_battery: devices.reduce((sum, d) => sum + d.status.battery, 0) / devices.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'sensors':
        if (method === 'GET') {
          const sensors = Array.from({ length: count }, () => generateSensor());
          res.status(200).json({
            data: sensors,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: sensors.filter(s => s.status === 'active').length,
              by_type: sensors.reduce((acc, s) => {
                acc[s.type] = (acc[s.type] || 0) + 1;
                return acc;
              }, {})
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'telemetry':
        if (method === 'GET') {
          const telemetry = Array.from({ length: count }, () => generateTelemetry());
          res.status(200).json({
            data: telemetry,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_cpu: telemetry.reduce((sum, t) => sum + t.system.cpu, 0) / telemetry.length,
              avg_memory: telemetry.reduce((sum, t) => sum + t.system.memory, 0) / telemetry.length,
              total_events: telemetry.reduce((sum, t) => sum + t.events.length, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'alerts':
        if (method === 'GET') {
          const alerts = Array.from({ length: count }, () => generateAlert());
          res.status(200).json({
            data: alerts,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: alerts.filter(a => a.status === 'active').length,
              by_severity: {
                critical: alerts.filter(a => a.severity === 'critical').length,
                high: alerts.filter(a => a.severity === 'high').length,
                medium: alerts.filter(a => a.severity === 'medium').length,
                low: alerts.filter(a => a.severity === 'low').length
              }
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'automations':
        if (method === 'GET') {
          const automations = Array.from({ length: count }, () => generateAutomation());
          res.status(200).json({
            data: automations,
            meta: {
              total: count,
              page: page,
              per_page: count,
              enabled_count: automations.filter(a => a.enabled).length,
              total_triggers: automations.reduce((sum, a) => sum + a.stats.triggered, 0),
              avg_success_rate: automations.reduce((sum, a) => sum + (a.stats.successful / (a.stats.successful + a.stats.failed || 1)), 0) / automations.length
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