import { faker } from '@faker-js/faker';

// Generate blog post data
function generatePost() {
  const tags = faker.helpers.arrayElements([
    'technology', 'programming', 'design', 'business', 'startup', 'productivity',
    'javascript', 'python', 'react', 'nodejs', 'ai', 'machine-learning',
    'web-development', 'mobile', 'devops', 'cloud', 'security', 'blockchain'
  ], { min: 1, max: 5 });

  return {
    id: faker.string.uuid(),
    slug: faker.lorem.slug(),
    title: faker.lorem.sentence({ min: 4, max: 10 }),
    subtitle: faker.lorem.sentence({ min: 6, max: 15 }),
    content: faker.lorem.paragraphs(faker.number.int({ min: 3, max: 15 }), '\n\n'),
    excerpt: faker.lorem.paragraph(),
    author: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      username: faker.internet.username(),
      avatar: faker.image.avatar(),
      bio: faker.lorem.sentence(),
      social: {
        twitter: faker.internet.url(),
        github: faker.internet.url(),
        website: faker.internet.url()
      }
    },
    category: {
      id: faker.string.uuid(),
      name: faker.helpers.arrayElement(['Technology', 'Programming', 'Design', 'Business', 'Tutorial', 'News']),
      slug: faker.lorem.slug()
    },
    tags: tags.map(tag => ({
      id: faker.string.uuid(),
      name: tag,
      slug: tag.toLowerCase().replace(/\s+/g, '-')
    })),
    featuredImage: {
      url: faker.image.url(),
      alt: faker.lorem.sentence(),
      caption: faker.lorem.sentence()
    },
    seo: {
      metaTitle: faker.lorem.sentence(),
      metaDescription: faker.lorem.paragraph(),
      keywords: tags,
      canonicalUrl: faker.internet.url()
    },
    stats: {
      views: faker.number.int({ min: 1, max: 100000 }),
      likes: faker.number.int({ min: 0, max: 5000 }),
      shares: faker.number.int({ min: 0, max: 1000 }),
      comments: faker.number.int({ min: 0, max: 500 }),
      readingTime: faker.number.int({ min: 1, max: 20 })
    },
    status: faker.helpers.arrayElement(['draft', 'published', 'archived', 'scheduled']),
    featured: faker.datatype.boolean(),
    allowComments: faker.datatype.boolean(),
    publishedAt: faker.date.past(),
    scheduledAt: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate comment data
function generateComment() {
  return {
    id: faker.string.uuid(),
    postId: faker.string.uuid(),
    parentId: faker.datatype.boolean() ? faker.string.uuid() : null,
    author: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      isVerified: faker.datatype.boolean(),
      isAuthor: faker.datatype.boolean()
    },
    content: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
    html: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
    mentions: faker.helpers.arrayElements([
      faker.internet.username(),
      faker.internet.username(),
      faker.internet.username()
    ], { min: 0, max: 2 }),
    reactions: {
      likes: faker.number.int({ min: 0, max: 100 }),
      dislikes: faker.number.int({ min: 0, max: 20 }),
      hearts: faker.number.int({ min: 0, max: 50 }),
      laughs: faker.number.int({ min: 0, max: 30 })
    },
    replies: faker.number.int({ min: 0, max: 10 }),
    status: faker.helpers.arrayElement(['approved', 'pending', 'spam', 'deleted']),
    flagged: faker.datatype.boolean(),
    edited: faker.datatype.boolean(),
    editedAt: faker.datatype.boolean() ? faker.date.recent() : null,
    ipAddress: faker.internet.ip(),
    userAgent: faker.internet.userAgent(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate media file data
function generateMedia() {
  const types = ['image', 'video', 'audio', 'document', 'archive'];
  const type = faker.helpers.arrayElement(types);
  
  const extensions = {
    image: ['jpg', 'png', 'gif', 'webp', 'svg'],
    video: ['mp4', 'avi', 'mov', 'mkv', 'webm'],
    audio: ['mp3', 'wav', 'ogg', 'flac'],
    document: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
    archive: ['zip', 'rar', '7z', 'tar.gz']
  };

  const extension = faker.helpers.arrayElement(extensions[type]);
  const filename = `${faker.lorem.slug()}.${extension}`;
  
  return {
    id: faker.string.uuid(),
    filename: filename,
    originalName: faker.system.fileName(),
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    type: type,
    mimeType: `${type}/${extension}`,
    size: faker.number.int({ min: 1024, max: 50000000 }),
    dimensions: type === 'image' || type === 'video' ? {
      width: faker.number.int({ min: 100, max: 4000 }),
      height: faker.number.int({ min: 100, max: 4000 })
    } : null,
    duration: type === 'video' || type === 'audio' ? faker.number.int({ min: 10, max: 7200 }) : null,
    url: faker.image.url(),
    thumbnailUrl: type === 'image' || type === 'video' ? faker.image.url() : null,
    alt: faker.lorem.sentence(),
    caption: faker.lorem.sentence(),
    metadata: {
      camera: type === 'image' ? faker.helpers.arrayElement(['Canon EOS R5', 'Nikon D850', 'Sony A7R IV']) : null,
      location: faker.datatype.boolean() ? {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        city: faker.location.city(),
        country: faker.location.country()
      } : null,
      tags: faker.helpers.arrayElements(['nature', 'portrait', 'landscape', 'architecture', 'street'], { min: 0, max: 3 })
    },
    uploader: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email()
    },
    folder: faker.helpers.arrayElement(['uploads', 'images', 'documents', 'media', 'assets']),
    isPublic: faker.datatype.boolean(),
    downloadCount: faker.number.int({ min: 0, max: 10000 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate category data
function generateCategory() {
  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      'Technology', 'Programming', 'Web Development', 'Mobile Development',
      'Data Science', 'Machine Learning', 'DevOps', 'Security', 'Design',
      'Business', 'Startups', 'Marketing', 'Productivity', 'Tutorials',
      'News', 'Reviews', 'Open Source', 'Career', 'Education'
    ]),
    slug: faker.lorem.slug(),
    description: faker.lorem.paragraph(),
    color: faker.internet.color(),
    icon: faker.helpers.arrayElement(['📱', '💻', '🚀', '🎨', '📊', '🔒', '☁️', '🤖']),
    parentId: faker.datatype.boolean() ? faker.string.uuid() : null,
    level: faker.number.int({ min: 0, max: 3 }),
    order: faker.number.int({ min: 0, max: 100 }),
    isActive: faker.datatype.boolean(),
    featuredImage: faker.image.url(),
    seo: {
      metaTitle: faker.lorem.sentence(),
      metaDescription: faker.lorem.paragraph(),
      keywords: faker.helpers.arrayElements(['tech', 'programming', 'web', 'mobile'], { min: 2, max: 5 })
    },
    stats: {
      postCount: faker.number.int({ min: 0, max: 500 }),
      subscriberCount: faker.number.int({ min: 0, max: 10000 }),
      totalViews: faker.number.int({ min: 0, max: 100000 })
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate tag data
function generateTag() {
  const techTags = [
    'javascript', 'python', 'react', 'nodejs', 'typescript', 'vue', 'angular',
    'docker', 'kubernetes', 'aws', 'git', 'linux', 'mongodb', 'postgresql',
    'redis', 'graphql', 'rest-api', 'microservices', 'devops', 'ci-cd',
    'machine-learning', 'ai', 'blockchain', 'cybersecurity', 'cloud-computing'
  ];
  
  const name = faker.helpers.arrayElement(techTags);
  
  return {
    id: faker.string.uuid(),
    name: name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    description: faker.lorem.sentence(),
    color: faker.internet.color(),
    isPopular: faker.datatype.boolean(),
    category: faker.helpers.arrayElement(['programming', 'framework', 'tool', 'concept', 'platform']),
    stats: {
      usageCount: faker.number.int({ min: 1, max: 1000 }),
      postCount: faker.number.int({ min: 0, max: 200 }),
      followerCount: faker.number.int({ min: 0, max: 5000 })
    },
    relatedTags: faker.helpers.arrayElements(techTags.filter(t => t !== name), { min: 0, max: 5 }),
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
          const posts = Array.from({ length: count }, () => generatePost());
          res.status(200).json({
            data: posts,
            meta: {
              total: count,
              page: page,
              per_page: count,
              has_more: faker.datatype.boolean(),
              featured_count: posts.filter(p => p.featured).length,
              total_views: posts.reduce((sum, p) => sum + p.stats.views, 0)
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: generatePost()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'comments':
        if (method === 'GET') {
          const comments = Array.from({ length: count }, () => generateComment());
          res.status(200).json({
            data: comments,
            meta: {
              total: count,
              page: page,
              per_page: count,
              pending_moderation: comments.filter(c => c.status === 'pending').length,
              flagged_count: comments.filter(c => c.flagged).length
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Comment posted successfully',
            comment: generateComment()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'media':
        if (method === 'GET') {
          const media = Array.from({ length: count }, () => generateMedia());
          res.status(200).json({
            data: media,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_size: media.reduce((sum, m) => sum + m.size, 0),
              by_type: {
                images: media.filter(m => m.type === 'image').length,
                videos: media.filter(m => m.type === 'video').length,
                documents: media.filter(m => m.type === 'document').length
              }
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Media uploaded successfully',
            media: generateMedia()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'categories':
        if (method === 'GET') {
          const categories = Array.from({ length: count }, () => generateCategory());
          res.status(200).json({
            data: categories,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: categories.filter(c => c.isActive).length,
              total_posts: categories.reduce((sum, c) => sum + c.stats.postCount, 0)
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category: generateCategory()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'tags':
        if (method === 'GET') {
          const tags = Array.from({ length: count }, () => generateTag());
          res.status(200).json({
            data: tags,
            meta: {
              total: count,
              page: page,
              per_page: count,
              popular_count: tags.filter(t => t.isPopular).length,
              total_usage: tags.reduce((sum, t) => sum + t.stats.usageCount, 0)
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Tag created successfully',
            tag: generateTag()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'pages':
        if (method === 'GET') {
          const pages = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            slug: faker.lorem.slug(),
            title: faker.lorem.words(3),
            subtitle: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(faker.number.int({ min: 5, max: 20 }), '\n\n'),
            excerpt: faker.lorem.paragraph(),
            author: {
              id: faker.string.uuid(),
              name: faker.person.fullName(),
              avatar: faker.image.avatar()
            },
            seo: {
              metaTitle: faker.lorem.words(5),
              metaDescription: faker.lorem.paragraph(),
              keywords: faker.helpers.arrayElements(['page', 'content', 'static', 'information'], { min: 2, max: 5 }),
              canonicalUrl: faker.internet.url()
            },
            template: faker.helpers.arrayElement(['default', 'landing', 'contact', 'about', 'services']),
            status: faker.helpers.arrayElement(['published', 'draft', 'scheduled', 'archived']),
            visibility: faker.helpers.arrayElement(['public', 'private', 'password_protected']),
            featuredImage: faker.datatype.boolean() ? {
              url: faker.image.url(),
              alt: faker.lorem.sentence(),
              caption: faker.lorem.sentence()
            } : null,
            stats: {
              views: faker.number.int({ min: 100, max: 10000 }),
              uniqueViews: faker.number.int({ min: 50, max: 5000 }),
              timeOnPage: faker.number.int({ min: 30, max: 600 }),
              bounceRate: faker.number.float({ min: 20, max: 80, fractionDigits: 1 })
            },
            navigation: {
              parentId: faker.datatype.boolean() ? faker.string.uuid() : null,
              order: faker.number.int({ min: 1, max: 10 }),
              showInMenu: faker.datatype.boolean(),
              menuLabel: faker.lorem.words(2)
            },
            publishedAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: pages,
            meta: {
              total: count,
              page: page,
              per_page: count,
              published_count: pages.filter(p => p.status === 'published').length,
              total_views: pages.reduce((sum, p) => sum + p.stats.views, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'authors':
        if (method === 'GET') {
          const authors = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            username: faker.internet.username(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            bio: faker.lorem.paragraph(),
            socialLinks: {
              twitter: faker.internet.url(),
              linkedin: faker.internet.url(),
              website: faker.internet.url(),
              github: faker.internet.url()
            },
            stats: {
              totalPosts: faker.number.int({ min: 1, max: 500 }),
              totalViews: faker.number.int({ min: 1000, max: 100000 }),
              totalComments: faker.number.int({ min: 0, max: 2000 }),
              averageRating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 })
            },
            expertise: faker.helpers.arrayElements([
              'Technology', 'Business', 'Design', 'Marketing', 'Development',
              'Data Science', 'AI', 'Blockchain', 'Mobile', 'Web'
            ], { min: 1, max: 5 }),
            role: faker.helpers.arrayElement(['Editor', 'Contributor', 'Guest Writer', 'Admin']),
            isActive: faker.datatype.boolean(),
            joinedAt: faker.date.past(),
            lastPublished: faker.date.recent()
          }));
          res.status(200).json({
            data: authors,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: authors.filter(a => a.isActive).length,
              total_posts: authors.reduce((sum, a) => sum + a.stats.totalPosts, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'newsletters':
        if (method === 'GET') {
          const newsletters = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            title: faker.lorem.words(4),
            subject: faker.lorem.words(6),
            content: {
              html: faker.lorem.paragraphs(10),
              text: faker.lorem.paragraphs(10),
              sections: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => ({
                title: faker.lorem.words(3),
                content: faker.lorem.paragraphs(2),
                image: faker.datatype.boolean() ? faker.image.url() : null
              }))
            },
            status: faker.helpers.arrayElement(['draft', 'scheduled', 'sent', 'archived']),
            schedule: faker.datatype.boolean() ? {
              date: faker.date.future(),
              timezone: faker.location.timeZone()
            } : null,
            audience: {
              segment: faker.helpers.arrayElement(['all_subscribers', 'active_users', 'premium_members', 'new_subscribers']),
              size: faker.number.int({ min: 100, max: 50000 }),
              filters: faker.helpers.arrayElements(['location', 'interests', 'engagement'], { min: 0, max: 3 })
            },
            performance: {
              sent: faker.number.int({ min: 0, max: 50000 }),
              delivered: faker.number.int({ min: 0, max: 47500 }),
              opened: faker.number.int({ min: 0, max: 15000 }),
              clicked: faker.number.int({ min: 0, max: 3000 }),
              unsubscribed: faker.number.int({ min: 0, max: 200 }),
              bounced: faker.number.int({ min: 0, max: 500 })
            },
            template: faker.helpers.arrayElement(['default', 'minimal', 'bold', 'newsletter', 'digest']),
            tags: faker.helpers.arrayElements(['weekly', 'monthly', 'announcement', 'product', 'industry'], { min: 1, max: 4 }),
            createdBy: faker.person.fullName(),
            sentAt: faker.datatype.boolean() ? faker.date.recent() : null,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: newsletters,
            meta: {
              total: count,
              page: page,
              per_page: count,
              sent_count: newsletters.filter(n => n.status === 'sent').length,
              total_sent: newsletters.reduce((sum, n) => sum + n.performance.sent, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'analytics':
        if (method === 'GET') {
          const analytics = {
            overview: {
              totalPosts: faker.number.int({ min: 1000, max: 50000 }),
              totalPages: faker.number.int({ min: 50, max: 1000 }),
              totalComments: faker.number.int({ min: 5000, max: 100000 }),
              totalAuthors: faker.number.int({ min: 10, max: 200 }),
              totalViews: faker.number.int({ min: 100000, max: 10000000 }),
              totalEngagement: faker.number.float({ min: 2, max: 15, fractionDigits: 1 })
            },
            content: {
              topPosts: Array.from({ length: 5 }, () => ({
                id: faker.string.uuid(),
                title: faker.lorem.words(4),
                views: faker.number.int({ min: 1000, max: 50000 }),
                engagement: faker.number.float({ min: 1, max: 20, fractionDigits: 1 })
              })),
              popularCategories: Array.from({ length: 5 }, () => ({
                name: faker.lorem.word(),
                posts: faker.number.int({ min: 10, max: 200 }),
                views: faker.number.int({ min: 5000, max: 100000 })
              })),
              contentTypes: {
                articles: faker.number.int({ min: 500, max: 20000 }),
                videos: faker.number.int({ min: 50, max: 2000 }),
                infographics: faker.number.int({ min: 20, max: 500 }),
                podcasts: faker.number.int({ min: 10, max: 200 })
              }
            },
            audience: {
              demographics: {
                age: {
                  '18-24': faker.number.int({ min: 10, max: 30 }),
                  '25-34': faker.number.int({ min: 20, max: 40 }),
                  '35-44': faker.number.int({ min: 15, max: 35 }),
                  '45+': faker.number.int({ min: 10, max: 25 })
                },
                gender: {
                  male: faker.number.int({ min: 30, max: 60 }),
                  female: faker.number.int({ min: 25, max: 55 }),
                  other: faker.number.int({ min: 5, max: 15 })
                }
              },
              geography: Array.from({ length: 5 }, () => ({
                country: faker.location.country(),
                percentage: faker.number.float({ min: 1, max: 20, fractionDigits: 1 })
              })),
              devices: {
                desktop: faker.number.int({ min: 30, max: 60 }),
                mobile: faker.number.int({ min: 25, max: 50 }),
                tablet: faker.number.int({ min: 5, max: 20 })
              }
            },
            engagement: {
              avgTimeOnPage: faker.number.int({ min: 120, max: 600 }),
              bounceRate: faker.number.float({ min: 30, max: 70, fractionDigits: 1 }),
              pagesPerSession: faker.number.float({ min: 1.5, max: 4.5, fractionDigits: 1 }),
              returnVisitorRate: faker.number.float({ min: 20, max: 60, fractionDigits: 1 })
            },
            period: 'last_30_days',
            updatedAt: new Date().toISOString()
          };
          res.status(200).json({
            data: analytics,
            meta: {
              refresh_interval: 3600000,
              last_updated: new Date().toISOString()
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'seo':
        if (method === 'GET') {
          const seo = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            url: faker.internet.url(),
            title: faker.lorem.words(5),
            metaDescription: faker.lorem.paragraph(),
            keywords: faker.helpers.arrayElements([
              'content', 'blog', 'article', 'news', 'tutorial', 'guide',
              'review', 'opinion', 'analysis', 'tips'
            ], { min: 3, max: 8 }),
            h1Tags: faker.helpers.arrayElements([
              faker.lorem.words(3), faker.lorem.words(4), faker.lorem.words(2)
            ], { min: 1, max: 3 }),
            score: faker.number.int({ min: 1, max: 100 }),
            issues: faker.helpers.arrayElements([
              'Missing meta description',
              'Title too long',
              'Low word count',
              'Missing alt text',
              'Broken links',
              'Slow loading'
            ], { min: 0, max: 4 }),
            recommendations: faker.helpers.arrayElements([
              'Add meta description',
              'Optimize title length',
              'Improve content depth',
              'Add internal links',
              'Optimize images',
              'Improve loading speed'
            ], { min: 1, max: 5 }),
            backlinks: faker.number.int({ min: 0, max: 1000 }),
            socialShares: {
              facebook: faker.number.int({ min: 0, max: 500 }),
              twitter: faker.number.int({ min: 0, max: 200 }),
              linkedin: faker.number.int({ min: 0, max: 100 }),
              pinterest: faker.number.int({ min: 0, max: 50 })
            },
            searchRankings: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
              keyword: faker.lorem.words(2),
              position: faker.number.int({ min: 1, max: 100 }),
              volume: faker.number.int({ min: 100, max: 10000 }),
              difficulty: faker.helpers.arrayElement(['low', 'medium', 'high'])
            })),
            lastCrawled: faker.date.recent(),
            nextCrawl: faker.date.future()
          }));
          res.status(200).json({
            data: seo,
            meta: {
              total: count,
              page: page,
              per_page: count,
              avg_score: seo.reduce((sum, s) => sum + s.score, 0) / seo.length,
              issues_count: seo.reduce((sum, s) => sum + s.issues.length, 0)
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