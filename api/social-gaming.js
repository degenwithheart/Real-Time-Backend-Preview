import { faker } from '@faker-js/faker';

// Generate social media post data
function generateSocialPost() {
  const createdAt = faker.date.recent({ days: 30 });
  const likes = faker.number.int({ min: 0, max: 10000 });
  const shares = faker.number.int({ min: 0, max: 1000 });
  const comments = faker.number.int({ min: 0, max: 500 });

  return {
    id: faker.string.uuid(),
    author: {
      id: faker.string.uuid(),
      username: faker.internet.username(),
      displayName: faker.person.fullName(),
      avatar: faker.image.avatar(),
      verified: faker.datatype.boolean(),
      followerCount: faker.number.int({ min: 100, max: 1000000 })
    },
    content: {
      text: faker.lorem.paragraphs({ min: 1, max: 3 }),
      media: faker.helpers.multiple(() => ({
        id: faker.string.uuid(),
        type: faker.helpers.arrayElement(['image', 'video', 'gif']),
        url: faker.image.url(),
        thumbnail: faker.image.url(),
        alt: faker.lorem.sentence(),
        dimensions: {
          width: faker.number.int({ min: 400, max: 1920 }),
          height: faker.number.int({ min: 300, max: 1080 })
        }
      }), { count: { min: 0, max: 4 } }),
      hashtags: faker.helpers.arrayElements([
        '#viral', '#trending', '#fyp', '#love', '#instagood', '#photooftheday',
        '#beautiful', '#happy', '#cute', '#tbt', '#art', '#photography'
      ], { min: 0, max: 5 }),
      mentions: faker.helpers.arrayElements([
        '@user1', '@user2', '@user3', '@user4', '@user5'
      ], { min: 0, max: 3 })
    },
    engagement: {
      likes: likes,
      shares: shares,
      comments: comments,
      views: faker.number.int({ min: likes * 10, max: likes * 100 }),
      saves: faker.number.int({ min: 0, max: likes / 10 })
    },
    location: faker.datatype.boolean() ? {
      name: faker.location.city(),
      coordinates: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude()
      }
    } : null,
    metadata: {
      platform: faker.helpers.arrayElement(['instagram', 'twitter', 'facebook', 'tiktok', 'linkedin']),
      visibility: faker.helpers.arrayElement(['public', 'friends', 'private']),
      sponsored: faker.datatype.boolean({ probability: 0.1 }),
      promoted: faker.datatype.boolean({ probability: 0.05 })
    },
    createdAt: createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() })
  };
}

// Generate follower/following data
function generateFollower() {
  return {
    id: faker.string.uuid(),
    follower: {
      id: faker.string.uuid(),
      username: faker.internet.username(),
      displayName: faker.person.fullName(),
      avatar: faker.image.avatar()
    },
    following: {
      id: faker.string.uuid(),
      username: faker.internet.username(),
      displayName: faker.person.fullName(),
      avatar: faker.image.avatar()
    },
    followedAt: faker.date.past(),
    mutual: faker.datatype.boolean(),
    relationship: faker.helpers.arrayElement(['friend', 'follower', 'following', 'mutual'])
  };
}

// Generate hashtag data
function generateHashtag() {
  const posts = faker.number.int({ min: 1000, max: 10000000 });
  return {
    id: faker.string.uuid(),
    tag: faker.helpers.arrayElement([
      'viral', 'trending', 'fyp', 'love', 'instagood', 'photooftheday',
      'beautiful', 'happy', 'cute', 'tbt', 'art', 'photography', 'fashion',
      'travel', 'food', 'fitness', 'music', 'dance', 'comedy', 'pets'
    ]),
    displayTag: '#' + faker.lorem.word(),
    posts: posts,
    trending: faker.datatype.boolean(),
    trendingScore: faker.number.int({ min: 1, max: 100 }),
    category: faker.helpers.arrayElement(['lifestyle', 'entertainment', 'fashion', 'food', 'travel', 'sports']),
    createdAt: faker.date.past(),
    lastUsed: faker.date.recent()
  };
}

// Generate story data
function generateStory() {
  const createdAt = faker.date.recent({ days: 1 });
  return {
    id: faker.string.uuid(),
    author: {
      id: faker.string.uuid(),
      username: faker.internet.username(),
      displayName: faker.person.fullName(),
      avatar: faker.image.avatar(),
      verified: faker.datatype.boolean()
    },
    content: {
      type: faker.helpers.arrayElement(['image', 'video', 'text', 'poll', 'question']),
      media: {
        url: faker.image.url(),
        type: faker.helpers.arrayElement(['image', 'video']),
        duration: faker.number.int({ min: 3, max: 15 })
      },
      text: faker.lorem.sentences({ min: 1, max: 3 }),
      background: faker.color.rgb(),
      font: faker.helpers.arrayElement(['default', 'bold', 'script', 'modern'])
    },
    interactions: {
      views: faker.number.int({ min: 100, max: 50000 }),
      replies: faker.number.int({ min: 0, max: 100 }),
      reactions: faker.helpers.arrayElements(['❤️', '👍', '😮', '😢', '😡', '😂'], { min: 0, max: 10 })
    },
    expiresAt: faker.date.future({ days: 1 }),
    createdAt: createdAt,
    seen: faker.datatype.boolean()
  };
}

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
      case 'posts':
        if (method === 'GET') {
          const posts = Array.from({ length: count }, () => generateSocialPost());
          res.status(200).json({
            data: posts,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_engagement: posts.reduce((sum, p) => sum + p.engagement.likes + p.engagement.shares + p.engagement.comments, 0),
              avg_likes: posts.reduce((sum, p) => sum + p.engagement.likes, 0) / posts.length,
              trending_posts: posts.filter(p => p.engagement.likes > 1000).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'followers':
        if (method === 'GET') {
          const followers = Array.from({ length: count }, () => generateFollower());
          res.status(200).json({
            data: followers,
            meta: {
              total: count,
              page: page,
              per_page: count,
              mutual_count: followers.filter(f => f.mutual).length,
              following_count: followers.filter(f => f.relationship === 'following').length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'hashtags':
        if (method === 'GET') {
          const hashtags = Array.from({ length: count }, () => generateHashtag());
          res.status(200).json({
            data: hashtags,
            meta: {
              total: count,
              page: page,
              per_page: count,
              trending_count: hashtags.filter(h => h.trending).length,
              total_posts: hashtags.reduce((sum, h) => sum + h.posts, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'stories':
        if (method === 'GET') {
          const stories = Array.from({ length: count }, () => generateStory());
          res.status(200).json({
            data: stories,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_views: stories.reduce((sum, s) => sum + s.interactions.views, 0),
              avg_views: stories.reduce((sum, s) => sum + s.interactions.views, 0) / stories.length,
              expiring_soon: stories.filter(s => new Date(s.expiresAt) < new Date(Date.now() + 4 * 60 * 60 * 1000)).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'messages':
        if (method === 'GET') {
          const messages = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            conversationId: faker.string.uuid(),
            sender: {
              id: faker.string.uuid(),
              username: faker.internet.username(),
              displayName: faker.person.fullName(),
              avatar: faker.image.avatar()
            },
            recipient: {
              id: faker.string.uuid(),
              username: faker.internet.username(),
              displayName: faker.person.fullName(),
              avatar: faker.image.avatar()
            },
            content: {
              text: faker.lorem.sentences({ min: 1, max: 3 }),
              media: faker.datatype.boolean() ? [{
                type: faker.helpers.arrayElement(['image', 'video', 'audio']),
                url: faker.image.url(),
                thumbnail: faker.image.url()
              }] : []
            },
            timestamp: faker.date.recent(),
            read: faker.datatype.boolean(),
            delivered: faker.datatype.boolean(),
            type: faker.helpers.arrayElement(['text', 'media', 'system', 'call'])
          }));
          res.status(200).json({
            data: messages,
            meta: {
              total: count,
              page: page,
              per_page: count,
              unread_count: messages.filter(m => !m.read).length,
              total_conversations: faker.number.int({ min: 10, max: 100 })
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'notifications':
        if (method === 'GET') {
          const notifications = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            type: faker.helpers.arrayElement(['like', 'comment', 'follow', 'mention', 'share', 'tag', 'friend_request', 'event_invite']),
            actor: {
              id: faker.string.uuid(),
              username: faker.internet.username(),
              displayName: faker.person.fullName(),
              avatar: faker.image.avatar()
            },
            target: {
              id: faker.string.uuid(),
              type: faker.helpers.arrayElement(['post', 'comment', 'profile', 'story', 'reel']),
              content: faker.lorem.sentence()
            },
            message: faker.lorem.sentence(),
            timestamp: faker.date.recent(),
            read: faker.datatype.boolean(),
            actionUrl: faker.internet.url()
          }));
          res.status(200).json({
            data: notifications,
            meta: {
              total: count,
              page: page,
              per_page: count,
              unread_count: notifications.filter(n => !n.read).length,
              total_notifications: faker.number.int({ min: 50, max: 500 })
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'groups':
        if (method === 'GET') {
          const groups = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            description: faker.lorem.sentences(2),
            avatar: faker.image.url(),
            coverImage: faker.image.url(),
            memberCount: faker.number.int({ min: 10, max: 10000 }),
            privacy: faker.helpers.arrayElement(['public', 'private', 'secret']),
            category: faker.helpers.arrayElement(['gaming', 'education', 'business', 'entertainment', 'sports', 'technology']),
            owner: {
              id: faker.string.uuid(),
              username: faker.internet.username(),
              displayName: faker.person.fullName(),
              avatar: faker.image.avatar()
            },
            rules: faker.helpers.arrayElements([
              'Be respectful to all members',
              'No spam or self-promotion',
              'Keep discussions on topic',
              'No hate speech or discrimination'
            ], { min: 2, max: 5 }),
            createdAt: faker.date.past(),
            lastActivity: faker.date.recent(),
            isMember: faker.datatype.boolean(),
            pendingRequest: faker.datatype.boolean()
          }));
          res.status(200).json({
            data: groups,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_groups: faker.number.int({ min: 100, max: 1000 }),
              joined_groups: faker.number.int({ min: 5, max: 50 })
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
            type: faker.helpers.arrayElement(['social', 'gaming', 'competition', 'meetup', 'conference', 'party']),
            startTime: faker.date.future(),
            endTime: faker.date.future(),
            timezone: faker.location.timeZone(),
            location: {
              name: faker.location.streetAddress(),
              coordinates: {
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
              },
              virtual: faker.datatype.boolean()
            },
            organizer: {
              id: faker.string.uuid(),
              username: faker.internet.username(),
              displayName: faker.person.fullName(),
              avatar: faker.image.avatar()
            },
            attendees: {
              confirmed: faker.number.int({ min: 10, max: 500 }),
              interested: faker.number.int({ min: 20, max: 1000 }),
              total: faker.number.int({ min: 50, max: 1500 })
            },
            category: faker.helpers.arrayElement(['conference', 'workshop', 'party', 'concert', 'sports', 'networking', 'gaming', 'esports']),
            price: faker.datatype.boolean() ? {
              amount: faker.number.float({ min: 0, max: 200, fractionDigits: 2 }),
              currency: faker.finance.currencyCode()
            } : null,
            images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.url()),
            tags: faker.helpers.arrayElements([
              'technology', 'music', 'food', 'art', 'business', 'health', 'gaming', 'esports'
            ], { min: 1, max: 4 }),
            isAttending: faker.datatype.boolean(),
            isInterested: faker.datatype.boolean(),
            gameEvent: faker.datatype.boolean() ? {
              game: faker.helpers.arrayElement(['CS:GO', 'League of Legends', 'Dota 2', 'Overwatch', 'Valorant']),
              tournament: faker.datatype.boolean(),
              prizePool: faker.number.int({ min: 1000, max: 100000 })
            } : null
          }));
          res.status(200).json({
            data: events,
            meta: {
              total: count,
              page: page,
              per_page: count,
              upcoming_events: events.filter(e => new Date(e.startTime) > new Date()).length,
              total_attendees: events.reduce((sum, e) => sum + e.attendees.total, 0),
              gaming_events: events.filter(e => e.gameEvent).length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'reels':
        if (method === 'GET') {
          const reels = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            author: {
              id: faker.string.uuid(),
              username: faker.internet.username(),
              displayName: faker.person.fullName(),
              avatar: faker.image.avatar(),
              verified: faker.datatype.boolean(),
              followerCount: faker.number.int({ min: 1000, max: 10000000 })
            },
            video: {
              url: faker.internet.url(),
              thumbnail: faker.image.url(),
              duration: faker.number.int({ min: 15, max: 90 }),
              dimensions: {
                width: 1080,
                height: 1920
              }
            },
            caption: faker.lorem.sentences({ min: 1, max: 3 }),
            audio: {
              name: faker.music.songName(),
              artist: faker.music.artist(),
              isOriginal: faker.datatype.boolean()
            },
            engagement: {
              likes: faker.number.int({ min: 1000, max: 10000000 }),
              comments: faker.number.int({ min: 100, max: 100000 }),
              shares: faker.number.int({ min: 100, max: 100000 }),
              views: faker.number.int({ min: 10000, max: 100000000 }),
              saves: faker.number.int({ min: 100, max: 100000 })
            },
            hashtags: faker.helpers.arrayElements([
              '#fyp', '#viral', '#trending', '#dance', '#music', '#funny', '#cute'
            ], { min: 1, max: 5 }),
            effects: faker.helpers.arrayElements([
              'slow_motion', 'time_warp', 'green_screen', 'duet', 'stitch'
            ], { min: 0, max: 3 }),
            createdAt: faker.date.recent(),
            location: faker.datatype.boolean() ? faker.location.city() : null,
            duetWith: faker.datatype.boolean() ? {
              id: faker.string.uuid(),
              username: faker.internet.username()
            } : null
          }));
          res.status(200).json({
            data: reels,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_views: reels.reduce((sum, r) => sum + r.engagement.views, 0),
              avg_likes: reels.reduce((sum, r) => sum + r.engagement.likes, 0) / reels.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'live':
        if (method === 'GET') {
          const liveStreams = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            streamer: {
              id: faker.string.uuid(),
              username: faker.internet.username(),
              displayName: faker.person.fullName(),
              avatar: faker.image.avatar(),
              verified: faker.datatype.boolean(),
              followerCount: faker.number.int({ min: 1000, max: 1000000 })
            },
            title: faker.lorem.words(5),
            description: faker.lorem.sentences(2),
            category: faker.helpers.arrayElement(['gaming', 'music', 'talk', 'cooking', 'fitness', 'art', 'esports', 'just_chatting']),
            thumbnail: faker.image.url(),
            streamUrl: faker.internet.url(),
            startedAt: faker.date.recent(),
            viewerCount: faker.number.int({ min: 10, max: 100000 }),
            peakViewers: faker.number.int({ min: 100, max: 500000 }),
            duration: faker.number.int({ min: 300, max: 14400 }), // 5 minutes to 4 hours
            isLive: faker.datatype.boolean(),
            chatEnabled: faker.datatype.boolean(),
            donations: faker.datatype.boolean(),
            tags: faker.helpers.arrayElements([
              'live', 'streaming', 'interactive', 'q&a', 'tutorial', 'gaming', 'esports'
            ], { min: 1, max: 4 }),
            reactions: {
              hearts: faker.number.int({ min: 100, max: 10000 }),
              likes: faker.number.int({ min: 500, max: 50000 }),
              shares: faker.number.int({ min: 10, max: 1000 })
            },
            comments: Array.from({ length: faker.number.int({ min: 5, max: 20 }) }, () => ({
              id: faker.string.uuid(),
              user: faker.internet.username(),
              message: faker.lorem.sentence(),
              timestamp: faker.date.recent(),
              likes: faker.number.int({ min: 0, max: 100 })
            }))
          }));
          res.status(200).json({
            data: liveStreams,
            meta: {
              total: count,
              page: page,
              per_page: count,
              live_count: liveStreams.filter(s => s.isLive).length,
              total_viewers: liveStreams.reduce((sum, s) => sum + s.viewerCount, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

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

      default:
        res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}