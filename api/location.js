import { faker } from '@faker-js/faker';

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

      default:
        res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}