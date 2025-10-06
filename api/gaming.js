import { faker } from '@faker-js/faker';

// Generate gaming player data
function generatePlayer() {
  const level = faker.number.int({ min: 1, max: 100 });
  const experience = faker.number.int({ min: 0, max: 1000000 });

  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    displayName: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    level: level,
    experience: experience,
    experienceToNext: faker.number.int({ min: 1000, max: 10000 }),
    rank: faker.helpers.arrayElement(['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger']),
    tier: faker.number.int({ min: 1, max: 5 }),
    stats: {
      gamesPlayed: faker.number.int({ min: 10, max: 10000 }),
      gamesWon: faker.number.int({ min: 5, max: 8000 }),
      winRate: faker.number.float({ min: 0.1, max: 0.9, fractionDigits: 3 }),
      averageScore: faker.number.int({ min: 100, max: 10000 }),
      bestScore: faker.number.int({ min: 1000, max: 50000 }),
      totalPlayTime: faker.number.int({ min: 3600, max: 100000 }), // seconds
      favoriteGameMode: faker.helpers.arrayElement(['ranked', 'casual', 'tournament', 'practice'])
    },
    skills: {
      aim: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      strategy: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      teamwork: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      leadership: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
      adaptability: faker.number.float({ min: 0, max: 100, fractionDigits: 1 })
    },
    inventory: {
      items: faker.number.int({ min: 0, max: 1000 }),
      skins: faker.number.int({ min: 0, max: 500 }),
      currency: {
        coins: faker.number.int({ min: 0, max: 100000 }),
        gems: faker.number.int({ min: 0, max: 10000 }),
        tokens: faker.number.int({ min: 0, max: 1000 })
      }
    },
    social: {
      friends: faker.number.int({ min: 0, max: 500 }),
      followers: faker.number.int({ min: 0, max: 10000 }),
      following: faker.number.int({ min: 0, max: 1000 }),
      clan: faker.datatype.boolean() ? {
        id: faker.string.uuid(),
        name: faker.company.name(),
        tag: faker.string.alpha(3).toUpperCase(),
        role: faker.helpers.arrayElement(['member', 'officer', 'leader'])
      } : null
    },
    achievements: Array.from({ length: faker.number.int({ min: 0, max: 20 }) }, () => ({
      id: faker.string.uuid(),
      name: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      icon: faker.image.url(),
      rarity: faker.helpers.arrayElement(['common', 'rare', 'epic', 'legendary']),
      unlockedAt: faker.date.past(),
      progress: faker.number.int({ min: 0, max: 100 })
    })),
    preferences: {
      language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de', 'ja', 'ko', 'zh']),
      region: faker.location.countryCode(),
      timezone: faker.location.timeZone(),
      notifications: faker.datatype.boolean()
    },
    status: faker.helpers.arrayElement(['online', 'offline', 'away', 'in_game']),
    lastActive: faker.date.recent(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate match data
function generateMatch() {
  const gameModes = ['ranked', 'casual', 'tournament', 'custom', 'training'];
  const gameMode = faker.helpers.arrayElement(gameModes);
  const duration = faker.number.int({ min: 300, max: 3600 }); // seconds
  const players = faker.number.int({ min: 2, max: 10 });

  return {
    id: faker.string.uuid(),
    gameId: faker.string.alphanumeric(8).toUpperCase(),
    mode: gameMode,
    map: faker.helpers.arrayElement(['Dust2', 'Mirage', 'Inferno', 'Cache', 'Overpass', 'Nuke', 'Vertigo']),
    type: faker.helpers.arrayElement(['1v1', '2v2', '3v3', '4v4', '5v5', 'free_for_all']),
    status: faker.helpers.arrayElement(['scheduled', 'in_progress', 'completed', 'cancelled']),
    duration: duration,
    startedAt: faker.date.recent(),
    endedAt: faker.datatype.boolean() ? faker.date.recent() : null,
    players: Array.from({ length: players }, () => ({
      id: faker.string.uuid(),
      username: faker.internet.username(),
      team: faker.helpers.arrayElement(['A', 'B']),
      score: faker.number.int({ min: 0, max: 50 }),
      kills: faker.number.int({ min: 0, max: 30 }),
      deaths: faker.number.int({ min: 0, max: 20 }),
      assists: faker.number.int({ min: 0, max: 15 }),
      mvp: faker.datatype.boolean({ probability: 0.1 })
    })),
    winner: faker.datatype.boolean() ? faker.helpers.arrayElement(['A', 'B']) : null,
    stats: {
      totalKills: faker.number.int({ min: 10, max: 200 }),
      totalDeaths: faker.number.int({ min: 10, max: 200 }),
      averageScore: faker.number.float({ min: 10, max: 50, fractionDigits: 1 }),
      spectators: faker.number.int({ min: 0, max: 1000 })
    },
    tournament: faker.datatype.boolean() ? {
      id: faker.string.uuid(),
      name: faker.lorem.words(3),
      round: faker.helpers.arrayElement(['qualifiers', 'round_1', 'round_2', 'quarterfinals', 'semifinals', 'finals'])
    } : null,
    recording: faker.datatype.boolean() ? {
      available: true,
      url: faker.internet.url(),
      views: faker.number.int({ min: 0, max: 10000 })
    } : { available: false },
    createdAt: faker.date.past()
  };
}

// Generate leaderboard data
function generateLeaderboard() {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    type: faker.helpers.arrayElement(['global', 'regional', 'seasonal', 'tournament']),
    gameMode: faker.helpers.arrayElement(['ranked', 'casual', 'battle_royale', 'team_deathmatch']),
    season: faker.number.int({ min: 1, max: 20 }),
    period: {
      start: faker.date.past(),
      end: faker.date.future()
    },
    rankings: Array.from({ length: 100 }, (_, index) => ({
      rank: index + 1,
      player: {
        id: faker.string.uuid(),
        username: faker.internet.username(),
        avatar: faker.image.avatar(),
        country: faker.location.countryCode()
      },
      score: faker.number.int({ min: 1000, max: 100000 }),
      change: faker.number.int({ min: -50, max: 50 }),
      stats: {
        winRate: faker.number.float({ min: 0.4, max: 0.95, fractionDigits: 3 }),
        gamesPlayed: faker.number.int({ min: 50, max: 1000 }),
        averageScore: faker.number.float({ min: 100, max: 1000, fractionDigits: 1 })
      },
      rewards: faker.datatype.boolean() ? [{
        type: faker.helpers.arrayElement(['coins', 'skins', 'titles', 'badges']),
        amount: faker.number.int({ min: 100, max: 10000 })
      }] : []
    })),
    meta: {
      totalPlayers: faker.number.int({ min: 10000, max: 1000000 }),
      lastUpdated: faker.date.recent(),
      nextUpdate: faker.date.future()
    }
  };
}

// Generate achievement data
function generateAchievement() {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    description: faker.lorem.sentence(),
    category: faker.helpers.arrayElement(['combat', 'social', 'progression', 'collection', 'special']),
    icon: faker.image.url(),
    rarity: faker.helpers.arrayElement(['common', 'rare', 'epic', 'legendary']),
    points: faker.number.int({ min: 10, max: 1000 }),
    requirements: {
      type: faker.helpers.arrayElement(['kills', 'wins', 'score', 'playtime', 'friends', 'items']),
      target: faker.number.int({ min: 1, max: 1000 }),
      current: faker.number.int({ min: 0, max: 1000 })
    },
    rewards: [{
      type: faker.helpers.arrayElement(['xp', 'coins', 'gems', 'skin', 'title', 'badge']),
      amount: faker.number.int({ min: 10, max: 10000 })
    }],
    unlockedBy: faker.number.int({ min: 0, max: 10000 }),
    unlockRate: faker.number.float({ min: 0.01, max: 0.8, fractionDigits: 3 }),
    seasonal: faker.datatype.boolean(),
    createdAt: faker.date.past()
  };
}

// Generate tournament data
function generateTournament() {
  const startDate = faker.date.future();
  const prizePool = faker.number.int({ min: 10000, max: 1000000 });

  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    game: faker.helpers.arrayElement(['CS:GO', 'League of Legends', 'Dota 2', 'Overwatch', 'Valorant', 'Apex Legends']),
    type: faker.helpers.arrayElement(['single_elimination', 'double_elimination', 'round_robin', 'swiss']),
    status: faker.helpers.arrayElement(['registration', 'in_progress', 'completed', 'cancelled']),
    format: faker.helpers.arrayElement(['1v1', '3v3', '5v5']),
    maxTeams: faker.number.int({ min: 8, max: 128 }),
    registeredTeams: faker.number.int({ min: 4, max: 64 }),
    prizePool: prizePool,
    prizes: [
      { place: 1, amount: Math.floor(prizePool * 0.4), percentage: 40 },
      { place: 2, amount: Math.floor(prizePool * 0.25), percentage: 25 },
      { place: 3, amount: Math.floor(prizePool * 0.15), percentage: 15 },
      { place: 4, amount: Math.floor(prizePool * 0.1), percentage: 10 },
      { place: 5, amount: Math.floor(prizePool * 0.05), percentage: 5 },
      { place: 6, amount: Math.floor(prizePool * 0.03), percentage: 3 },
      { place: 7, amount: Math.floor(prizePool * 0.02), percentage: 2 }
    ],
    schedule: {
      registrationStart: faker.date.past(),
      registrationEnd: faker.date.between({ from: new Date(), to: startDate }),
      start: startDate,
      end: faker.date.future({ days: 7 })
    },
    rules: {
      maxPlayers: faker.number.int({ min: 1, max: 5 }),
      minRank: faker.helpers.arrayElement(['Bronze', 'Silver', 'Gold', 'Platinum']),
      region: faker.helpers.arrayElement(['NA', 'EU', 'ASIA', 'OCEANIA', 'Global'])
    },
    organizer: {
      id: faker.string.uuid(),
      name: faker.company.name(),
      logo: faker.image.url()
    },
    sponsors: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
      name: faker.company.name(),
      logo: faker.image.url(),
      tier: faker.helpers.arrayElement(['platinum', 'gold', 'silver', 'bronze'])
    })),
    streams: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      platform: faker.helpers.arrayElement(['twitch', 'youtube', 'facebook']),
      url: faker.internet.url(),
      viewers: faker.number.int({ min: 1000, max: 100000 })
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
      case 'players':
        if (method === 'GET') {
          const players = Array.from({ length: count }, () => generatePlayer());
          res.status(200).json({
            data: players,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_level: players.reduce((sum, p) => sum + p.level, 0) / players.length,
              online_count: players.filter(p => p.status === 'online').length,
              total_experience: players.reduce((sum, p) => sum + p.experience, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'matches':
        if (method === 'GET') {
          const matches = Array.from({ length: count }, () => generateMatch());
          res.status(200).json({
            data: matches,
            meta: {
              total: count,
              page: page,
              per_page: count,
              completed_count: matches.filter(m => m.status === 'completed').length,
              avg_duration: matches.reduce((sum, m) => sum + m.duration, 0) / matches.length,
              total_players: matches.reduce((sum, m) => sum + m.players.length, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'leaderboards':
        if (method === 'GET') {
          const leaderboards = Array.from({ length: count }, () => generateLeaderboard());
          res.status(200).json({
            data: leaderboards,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_rankings: leaderboards.reduce((sum, l) => sum + l.rankings.length, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'achievements':
        if (method === 'GET') {
          const achievements = Array.from({ length: count }, () => generateAchievement());
          res.status(200).json({
            data: achievements,
            meta: {
              total: count,
              page: page,
              per_page: count,
              by_rarity: {
                common: achievements.filter(a => a.rarity === 'common').length,
                rare: achievements.filter(a => a.rarity === 'rare').length,
                epic: achievements.filter(a => a.rarity === 'epic').length,
                legendary: achievements.filter(a => a.rarity === 'legendary').length
              },
              total_points: achievements.reduce((sum, a) => sum + a.points, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'tournaments':
        if (method === 'GET') {
          const tournaments = Array.from({ length: count }, () => generateTournament());
          res.status(200).json({
            data: tournaments,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_prize_pool: tournaments.reduce((sum, t) => sum + t.prizePool, 0),
              active_count: tournaments.filter(t => t.status === 'in_progress').length,
              avg_teams: tournaments.reduce((sum, t) => sum + t.registeredTeams, 0) / tournaments.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'guilds':
        if (method === 'GET') {
          const guilds = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            tag: faker.string.alphanumeric(4).toUpperCase(),
            description: faker.lorem.sentences(2),
            emblem: faker.image.url(),
            level: faker.number.int({ min: 1, max: 100 }),
            memberCount: faker.number.int({ min: 5, max: 500 }),
            maxMembers: faker.number.int({ min: 50, max: 1000 }),
            leader: {
              id: faker.string.uuid(),
              username: faker.internet.username(),
              level: faker.number.int({ min: 10, max: 100 })
            },
            officers: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
              id: faker.string.uuid(),
              username: faker.internet.username(),
              role: faker.helpers.arrayElement(['officer', 'captain', 'recruiter'])
            })),
            reputation: faker.number.int({ min: -1000, max: 10000 }),
            achievements: Array.from({ length: faker.number.int({ min: 0, max: 20 }) }, () => ({
              id: faker.string.uuid(),
              name: faker.lorem.words(2),
              description: faker.lorem.sentence(),
              unlockedAt: faker.date.past()
            })),
            requirements: {
              minLevel: faker.number.int({ min: 1, max: 50 }),
              applicationRequired: faker.datatype.boolean()
            },
            createdAt: faker.date.past(),
            lastActivity: faker.date.recent()
          }));
          res.status(200).json({
            data: guilds,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_guilds: faker.number.int({ min: 1000, max: 10000 }),
              avg_level: guilds.reduce((sum, g) => sum + g.level, 0) / guilds.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'items':
        if (method === 'GET') {
          const items = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
            type: faker.helpers.arrayElement(['weapon', 'armor', 'consumable', 'material', 'cosmetic', 'mount']),
            rarity: faker.helpers.arrayElement(['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic']),
            level: faker.number.int({ min: 1, max: 100 }),
            stats: {
              attack: faker.number.int({ min: 0, max: 500 }),
              defense: faker.number.int({ min: 0, max: 500 }),
              health: faker.number.int({ min: 0, max: 1000 }),
              mana: faker.number.int({ min: 0, max: 1000 }),
              speed: faker.number.int({ min: 0, max: 200 })
            },
            value: faker.number.int({ min: 1, max: 10000 }),
            description: faker.lorem.sentences(2),
            icon: faker.image.url(),
            obtainable: faker.datatype.boolean(),
            tradeable: faker.datatype.boolean(),
            droprate: faker.number.float({ min: 0.01, max: 10, fractionDigits: 2 }),
            requiredLevel: faker.number.int({ min: 1, max: 100 }),
            effects: faker.helpers.arrayElements([
              'fire_damage', 'ice_damage', 'poison', 'healing', 'speed_boost', 'strength_boost'
            ], { min: 0, max: 3 })
          }));
          res.status(200).json({
            data: items,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_items: faker.number.int({ min: 10000, max: 100000 }),
              legendary_count: items.filter(i => i.rarity === 'legendary').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'quests':
        if (method === 'GET') {
          const quests = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            title: faker.lorem.words(4),
            description: faker.lorem.paragraph(),
            type: faker.helpers.arrayElement(['main', 'side', 'daily', 'weekly', 'event']),
            difficulty: faker.helpers.arrayElement(['easy', 'medium', 'hard', 'expert']),
            level: faker.number.int({ min: 1, max: 100 }),
            rewards: {
              experience: faker.number.int({ min: 100, max: 10000 }),
              gold: faker.number.int({ min: 10, max: 10000 }),
              items: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                quantity: faker.number.int({ min: 1, max: 5 })
              }))
            },
            objectives: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
              description: faker.lorem.sentence(),
              type: faker.helpers.arrayElement(['kill', 'collect', 'explore', 'craft', 'deliver']),
              target: faker.lorem.words(2),
              current: faker.number.int({ min: 0, max: 10 }),
              required: faker.number.int({ min: 5, max: 20 }),
              completed: faker.datatype.boolean()
            })),
            timeLimit: faker.datatype.boolean() ? faker.number.int({ min: 3600, max: 86400 }) : null,
            prerequisites: faker.helpers.arrayElements([
              'Complete previous quest',
              'Reach level 10',
              'Join a guild'
            ], { min: 0, max: 2 }),
            status: faker.helpers.arrayElement(['available', 'in_progress', 'completed', 'failed']),
            startedAt: faker.date.recent(),
            completedAt: faker.datatype.boolean() ? faker.date.recent() : null
          }));
          res.status(200).json({
            data: quests,
            meta: {
              total: count,
              page: page,
              per_page: count,
              completed_count: quests.filter(q => q.status === 'completed').length,
              daily_count: quests.filter(q => q.type === 'daily').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'stats':
        if (method === 'GET') {
          const stats = Array.from({ length: count }, () => ({
            playerId: faker.string.uuid(),
            username: faker.internet.username(),
            overall: {
              level: faker.number.int({ min: 1, max: 100 }),
              experience: faker.number.int({ min: 0, max: 1000000 }),
              playtime: faker.number.int({ min: 3600, max: 1000000 }), // seconds
              gamesPlayed: faker.number.int({ min: 10, max: 10000 }),
              gamesWon: faker.number.int({ min: 5, max: 5000 }),
              winRate: faker.number.float({ min: 0, max: 1, fractionDigits: 3 })
            },
            combat: {
              kills: faker.number.int({ min: 0, max: 10000 }),
              deaths: faker.number.int({ min: 0, max: 5000 }),
              assists: faker.number.int({ min: 0, max: 8000 }),
              kdr: faker.number.float({ min: 0, max: 5, fractionDigits: 2 }),
              damageDealt: faker.number.int({ min: 10000, max: 10000000 }),
              damageTaken: faker.number.int({ min: 5000, max: 5000000 })
            },
            progression: {
              questsCompleted: faker.number.int({ min: 0, max: 1000 }),
              achievementsUnlocked: faker.number.int({ min: 0, max: 200 }),
              itemsCollected: faker.number.int({ min: 10, max: 5000 }),
              areasExplored: faker.number.int({ min: 1, max: 100 })
            },
            social: {
              friends: faker.number.int({ min: 0, max: 500 }),
              guildMembers: faker.number.int({ min: 0, max: 499 }),
              messagesSent: faker.number.int({ min: 100, max: 50000 })
            },
            rankings: {
              global: faker.number.int({ min: 1, max: 100000 }),
              regional: faker.number.int({ min: 1, max: 10000 }),
              guild: faker.number.int({ min: 1, max: 500 })
            },
            lastUpdated: faker.date.recent()
          }));
          res.status(200).json({
            data: stats,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_level: stats.reduce((sum, s) => sum + s.overall.level, 0) / stats.length,
              total_playtime: stats.reduce((sum, s) => sum + s.overall.playtime, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'events':
        if (method === 'GET') {
          const events = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            title: faker.lorem.words(3),
            description: faker.lorem.paragraph(),
            type: faker.helpers.arrayElement(['seasonal', 'limited_time', 'maintenance', 'update', 'competition']),
            startDate: faker.date.future(),
            endDate: faker.date.future(),
            status: faker.helpers.arrayElement(['upcoming', 'active', 'ended']),
            rewards: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
              type: faker.helpers.arrayElement(['item', 'currency', 'experience', 'title', 'cosmetic']),
              name: faker.lorem.words(2),
              rarity: faker.helpers.arrayElement(['common', 'rare', 'epic', 'legendary']),
              quantity: faker.number.int({ min: 1, max: 100 })
            })),
            requirements: {
              minLevel: faker.number.int({ min: 1, max: 50 }),
              vipRequired: faker.datatype.boolean(),
              purchaseRequired: faker.datatype.boolean()
            },
            participants: faker.number.int({ min: 100, max: 100000 }),
            progress: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
            featured: faker.datatype.boolean(),
            banner: faker.image.url(),
            rules: faker.lorem.paragraphs(2)
          }));
          res.status(200).json({
            data: events,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_events: events.filter(e => e.status === 'active').length,
              total_participants: events.reduce((sum, e) => sum + e.participants, 0)
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