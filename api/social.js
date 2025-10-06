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
            description: faker.lorem.paragraphs(2),
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
            category: faker.helpers.arrayElement(['conference', 'workshop', 'party', 'concert', 'sports', 'networking']),
            price: faker.datatype.boolean() ? {
              amount: faker.number.float({ min: 0, max: 200, fractionDigits: 2 }),
              currency: faker.finance.currencyCode()
            } : null,
            images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.url()),
            tags: faker.helpers.arrayElements([
              'technology', 'music', 'food', 'art', 'business', 'health'
            ], { min: 1, max: 4 }),
            isAttending: faker.datatype.boolean(),
            isInterested: faker.datatype.boolean()
          }));
          res.status(200).json({
            data: events,
            meta: {
              total: count,
              page: page,
              per_page: count,
              upcoming_events: events.filter(e => new Date(e.startTime) > new Date()).length,
              total_attendees: events.reduce((sum, e) => sum + e.attendees.total, 0)
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
            category: faker.helpers.arrayElement(['gaming', 'music', 'talk', 'cooking', 'fitness', 'art']),
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
              'live', 'streaming', 'interactive', 'q&a', 'tutorial'
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

      default:
        res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}