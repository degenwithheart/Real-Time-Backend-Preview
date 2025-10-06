import { faker } from '@faker-js/faker';

// Generate message data
function generateMessage() {
  return {
    id: faker.string.uuid(),
    conversationId: faker.string.uuid(),
    threadId: faker.string.uuid(),
    sender: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      username: faker.internet.username(),
      avatar: faker.image.avatar(),
      status: faker.helpers.arrayElement(['online', 'offline', 'away', 'busy']),
      role: faker.helpers.arrayElement(['user', 'admin', 'moderator', 'bot'])
    },
    recipient: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      username: faker.internet.username(),
      avatar: faker.image.avatar()
    },
    content: {
      text: faker.lorem.paragraph(),
      html: faker.lorem.paragraph(),
      mentions: faker.helpers.arrayElements([
        faker.internet.username(),
        faker.internet.username()
      ], { min: 0, max: 2 }),
      hashtags: faker.helpers.arrayElements([
        'urgent', 'meeting', 'project', 'update'
      ], { min: 0, max: 2 })
    },
    type: faker.helpers.arrayElement(['text', 'image', 'file', 'audio', 'video', 'location', 'contact']),
    attachments: faker.helpers.multiple(() => ({
      id: faker.string.uuid(),
      filename: faker.system.fileName(),
      url: faker.internet.url(),
      mimeType: faker.system.mimeType(),
      size: faker.number.int({ min: 1024, max: 10485760 }),
      thumbnail: faker.image.url()
    }), { count: { min: 0, max: 3 } }),
    reactions: faker.helpers.multiple(() => ({
      emoji: faker.helpers.arrayElement(['👍', '❤️', '😂', '😢', '😡', '👏']),
      userId: faker.string.uuid(),
      userName: faker.person.firstName(),
      timestamp: faker.date.recent()
    }), { count: { min: 0, max: 10 } }),
    status: faker.helpers.arrayElement(['sent', 'delivered', 'read', 'failed']),
    priority: faker.helpers.arrayElement(['low', 'normal', 'high', 'urgent']),
    isEdited: faker.datatype.boolean(),
    editedAt: faker.datatype.boolean() ? faker.date.recent() : null,
    isDeleted: faker.datatype.boolean(),
    deletedAt: faker.datatype.boolean() ? faker.date.recent() : null,
    replyTo: faker.datatype.boolean() ? {
      messageId: faker.string.uuid(),
      snippet: faker.lorem.sentence(),
      sender: faker.person.firstName()
    } : null,
    metadata: {
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
      location: {
        city: faker.location.city(),
        country: faker.location.country()
      }
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    readAt: faker.datatype.boolean() ? faker.date.recent() : null
  };
}

// Generate notification data
function generateNotification() {
  const notificationTypes = [
    'message', 'mention', 'like', 'comment', 'follow', 'system',
    'security', 'payment', 'order', 'reminder', 'promotion'
  ];

  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    type: faker.helpers.arrayElement(notificationTypes),
    category: faker.helpers.arrayElement(['social', 'system', 'marketing', 'security', 'transactional']),
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    message: faker.lorem.paragraph(),
    icon: faker.helpers.arrayElement(['📧', '💬', '🔔', '⚠️', '✅', '🎉', '🔒']),
    image: faker.image.url(),
    data: {
      action: faker.helpers.arrayElement(['view', 'approve', 'dismiss', 'reply', 'like']),
      actionUrl: faker.internet.url(),
      entityType: faker.helpers.arrayElement(['post', 'comment', 'user', 'order', 'message']),
      entityId: faker.string.uuid(),
      metadata: {
        source: faker.helpers.arrayElement(['web', 'mobile', 'email', 'push']),
        campaign: faker.lorem.words(2),
        priority: faker.helpers.arrayElement(['low', 'normal', 'high', 'critical'])
      }
    },
    channels: {
      push: faker.datatype.boolean(),
      email: faker.datatype.boolean(),
      sms: faker.datatype.boolean(),
      inApp: faker.datatype.boolean()
    },
    status: faker.helpers.arrayElement(['pending', 'sent', 'delivered', 'read', 'clicked', 'failed']),
    priority: faker.helpers.arrayElement(['low', 'normal', 'high', 'urgent']),
    isRead: faker.datatype.boolean(),
    readAt: faker.datatype.boolean() ? faker.date.recent() : null,
    isClicked: faker.datatype.boolean(),
    clickedAt: faker.datatype.boolean() ? faker.date.recent() : null,
    expiresAt: faker.date.future(),
    batchId: faker.string.uuid(),
    sender: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      type: faker.helpers.arrayElement(['user', 'system', 'bot'])
    },
    targeting: {
      segments: faker.helpers.arrayElements(['new_users', 'premium', 'active'], { min: 0, max: 2 }),
      location: faker.location.country(),
      language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de'])
    },
    createdAt: faker.date.past(),
    sentAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  };
}

// Generate email data
function generateEmail() {
  return {
    id: faker.string.uuid(),
    messageId: faker.internet.email(),
    sender: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      replyTo: faker.internet.email()
    },
    recipients: {
      to: faker.helpers.multiple(() => ({
        email: faker.internet.email(),
        name: faker.person.fullName()
      }), { count: { min: 1, max: 5 } }),
      cc: faker.helpers.multiple(() => ({
        email: faker.internet.email(),
        name: faker.person.fullName()
      }), { count: { min: 0, max: 3 } }),
      bcc: faker.helpers.multiple(() => ({
        email: faker.internet.email(),
        name: faker.person.fullName()
      }), { count: { min: 0, max: 2 } })
    },
    subject: faker.lorem.sentence({ min: 4, max: 10 }),
    content: {
      text: faker.lorem.paragraphs(3, '\n\n'),
      html: faker.lorem.paragraphs(3, '<br><br>'),
      preheader: faker.lorem.sentence()
    },
    template: {
      id: faker.string.uuid(),
      name: faker.lorem.words(3),
      version: faker.system.semver(),
      variables: {
        firstName: faker.person.firstName(),
        companyName: faker.company.name(),
        discount: faker.number.int({ min: 10, max: 50 })
      }
    },
    campaign: {
      id: faker.string.uuid(),
      name: faker.lorem.words(4),
      type: faker.helpers.arrayElement(['newsletter', 'promotional', 'transactional', 'welcome', 'abandoned_cart']),
      tags: faker.helpers.arrayElements(['marketing', 'sales', 'support'], { min: 1, max: 3 })
    },
    attachments: faker.helpers.multiple(() => ({
      filename: faker.system.fileName(),
      contentType: faker.system.mimeType(),
      size: faker.number.int({ min: 1024, max: 5242880 }),
      cid: faker.string.uuid()
    }), { count: { min: 0, max: 3 } }),
    tracking: {
      opens: faker.number.int({ min: 0, max: 100 }),
      clicks: faker.number.int({ min: 0, max: 50 }),
      bounces: faker.number.int({ min: 0, max: 5 }),
      unsubscribes: faker.number.int({ min: 0, max: 2 }),
      complaints: faker.number.int({ min: 0, max: 1 }),
      deliveryRate: faker.number.float({ min: 85, max: 100, fractionDigits: 1 }),
      openRate: faker.number.float({ min: 15, max: 45, fractionDigits: 1 }),
      clickRate: faker.number.float({ min: 2, max: 15, fractionDigits: 1 })
    },
    status: faker.helpers.arrayElement(['draft', 'scheduled', 'sending', 'sent', 'delivered', 'bounced', 'failed']),
    priority: faker.helpers.arrayElement(['low', 'normal', 'high']),
    scheduledAt: faker.date.future(),
    sentAt: faker.date.recent(),
    deliveredAt: faker.date.recent(),
    provider: {
      name: faker.helpers.arrayElement(['SendGrid', 'Mailgun', 'Amazon SES', 'Postmark']),
      messageId: faker.string.alphanumeric(32)
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

// Generate contact data
function generateContact() {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    displayName: faker.person.fullName(),
    nickname: faker.person.middleName(),
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department(),
    emails: faker.helpers.multiple(() => ({
      type: faker.helpers.arrayElement(['personal', 'work', 'other']),
      email: faker.internet.email(),
      isPrimary: faker.datatype.boolean()
    }), { count: { min: 1, max: 3 } }),
    phones: faker.helpers.multiple(() => ({
      type: faker.helpers.arrayElement(['mobile', 'home', 'work', 'fax']),
      number: faker.phone.number(),
      isPrimary: faker.datatype.boolean()
    }), { count: { min: 1, max: 4 } }),
    addresses: faker.helpers.multiple(() => ({
      type: faker.helpers.arrayElement(['home', 'work', 'other']),
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      isPrimary: faker.datatype.boolean()
    }), { count: { min: 0, max: 3 } }),
    socialProfiles: {
      twitter: faker.internet.url(),
      linkedin: faker.internet.url(),
      facebook: faker.internet.url(),
      instagram: faker.internet.url(),
      github: faker.internet.url(),
      website: faker.internet.url()
    },
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    anniversary: faker.date.past(),
    notes: faker.lorem.paragraph(),
    tags: faker.helpers.arrayElements(['client', 'prospect', 'partner', 'vendor', 'vip'], { min: 0, max: 3 }),
    customFields: {
      leadSource: faker.helpers.arrayElement(['website', 'referral', 'social', 'event', 'cold_call']),
      leadScore: faker.number.int({ min: 0, max: 100 }),
      industry: faker.commerce.department(),
      timezone: faker.location.timeZone(),
      preferredLanguage: faker.helpers.arrayElement(['en', 'es', 'fr', 'de'])
    },
    relationships: faker.helpers.multiple(() => ({
      contactId: faker.string.uuid(),
      type: faker.helpers.arrayElement(['spouse', 'colleague', 'friend', 'family', 'manager']),
      name: faker.person.fullName()
    }), { count: { min: 0, max: 5 } }),
    lastInteraction: {
      type: faker.helpers.arrayElement(['call', 'email', 'meeting', 'message']),
      date: faker.date.recent(),
      notes: faker.lorem.sentence()
    },
    isBlocked: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    source: faker.helpers.arrayElement(['manual', 'import', 'api', 'signup', 'social']),
    createdBy: {
      id: faker.string.uuid(),
      name: faker.person.fullName()
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}

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
      case 'messages':
        if (method === 'GET') {
          const messages = Array.from({ length: count }, () => generateMessage());
          res.status(200).json({
            data: messages,
            meta: {
              total: count,
              page: page,
              per_page: count,
              unread_count: messages.filter(m => !m.readAt).length,
              conversation_count: [...new Set(messages.map(m => m.conversationId))].length
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: generateMessage()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'notifications':
        if (method === 'GET') {
          const notifications = Array.from({ length: count }, () => generateNotification());
          res.status(200).json({
            data: notifications,
            meta: {
              total: count,
              page: page,
              per_page: count,
              unread_count: notifications.filter(n => !n.isRead).length,
              by_type: {
                system: notifications.filter(n => n.category === 'system').length,
                social: notifications.filter(n => n.category === 'social').length,
                marketing: notifications.filter(n => n.category === 'marketing').length
              }
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Notification created successfully',
            notification: generateNotification()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'emails':
        if (method === 'GET') {
          const emails = Array.from({ length: count }, () => generateEmail());
          res.status(200).json({
            data: emails,
            meta: {
              total: count,
              page: page,
              per_page: count,
              stats: {
                total_sent: emails.filter(e => e.status === 'sent').length,
                total_delivered: emails.filter(e => e.status === 'delivered').length,
                avg_open_rate: emails.reduce((sum, e) => sum + e.tracking.openRate, 0) / emails.length,
                avg_click_rate: emails.reduce((sum, e) => sum + e.tracking.clickRate, 0) / emails.length
              }
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Email queued successfully',
            email: generateEmail()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'contacts':
        if (method === 'GET') {
          const contacts = Array.from({ length: count }, () => generateContact());
          res.status(200).json({
            data: contacts,
            meta: {
              total: count,
              page: page,
              per_page: count,
              favorites_count: contacts.filter(c => c.isFavorite).length,
              blocked_count: contacts.filter(c => c.isBlocked).length,
              companies_count: [...new Set(contacts.map(c => c.company).filter(Boolean))].length
            }
          });
        } else if (method === 'POST') {
          res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            contact: generateContact()
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'calls':
        if (method === 'GET') {
          const calls = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            callerId: faker.string.uuid(),
            callerName: faker.person.fullName(),
            calleeId: faker.string.uuid(),
            calleeName: faker.person.fullName(),
            type: faker.helpers.arrayElement(['incoming', 'outgoing', 'missed']),
            duration: faker.number.int({ min: 0, max: 3600 }),
            status: faker.helpers.arrayElement(['completed', 'missed', 'busy', 'no_answer', 'failed']),
            startTime: faker.date.recent(),
            endTime: faker.datatype.boolean() ? faker.date.recent() : null,
            recording: faker.datatype.boolean() ? {
              url: faker.internet.url(),
              duration: faker.number.int({ min: 60, max: 3600 }),
              size: faker.number.int({ min: 1024, max: 10485760 })
            } : null,
            notes: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
            tags: faker.helpers.arrayElements(['urgent', 'client', 'internal', 'sales', 'support'], { min: 0, max: 3 }),
            cost: faker.number.float({ min: 0, max: 5, fractionDigits: 2 })
          }));
          res.status(200).json({
            data: calls,
            meta: {
              total: count,
              page: page,
              per_page: count,
              total_duration: calls.reduce((sum, c) => sum + c.duration, 0),
              completed_count: calls.filter(c => c.status === 'completed').length,
              total_cost: calls.reduce((sum, c) => sum + c.cost, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'channels':
        if (method === 'GET') {
          const channels = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            description: faker.lorem.sentence(),
            type: faker.helpers.arrayElement(['public', 'private', 'direct', 'group']),
            owner: {
              id: faker.string.uuid(),
              name: faker.person.fullName(),
              avatar: faker.image.avatar()
            },
            members: Array.from({ length: faker.number.int({ min: 2, max: 50 }) }, () => ({
              id: faker.string.uuid(),
              name: faker.person.fullName(),
              avatar: faker.image.avatar(),
              role: faker.helpers.arrayElement(['owner', 'admin', 'member']),
              joinedAt: faker.date.past()
            })),
            isArchived: faker.datatype.boolean(),
            lastActivity: faker.date.recent(),
            messageCount: faker.number.int({ min: 0, max: 10000 }),
            unreadCount: faker.number.int({ min: 0, max: 100 }),
            topic: faker.datatype.boolean() ? faker.lorem.sentence() : null,
            purpose: faker.datatype.boolean() ? faker.lorem.sentence() : null,
            integrations: faker.helpers.arrayElements(['slack', 'discord', 'teams', 'webhook'], { min: 0, max: 3 }),
            settings: {
              allowInvites: faker.datatype.boolean(),
              allowFileUploads: faker.datatype.boolean(),
              allowThreadReplies: faker.datatype.boolean(),
              isReadOnly: faker.datatype.boolean()
            },
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: channels,
            meta: {
              total: count,
              page: page,
              per_page: count,
              public_count: channels.filter(c => c.type === 'public').length,
              total_members: channels.reduce((sum, c) => sum + c.members.length, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'templates':
        if (method === 'GET') {
          const templates = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            category: faker.helpers.arrayElement(['welcome', 'marketing', 'support', 'notification', 'reminder', 'confirmation']),
            type: faker.helpers.arrayElement(['email', 'sms', 'push', 'in_app']),
            subject: faker.lorem.words(5),
            content: {
              text: faker.lorem.paragraphs(3),
              html: faker.lorem.paragraphs(3),
              variables: faker.helpers.arrayElements(['{{name}}', '{{email}}', '{{company}}', '{{date}}', '{{amount}}'], { min: 1, max: 5 })
            },
            language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de', 'ja', 'zh']),
            tags: faker.helpers.arrayElements(['urgent', 'promotional', 'transactional', 'automated'], { min: 1, max: 3 }),
            usage: {
              sent: faker.number.int({ min: 0, max: 10000 }),
              opened: faker.number.int({ min: 0, max: 5000 }),
              clicked: faker.number.int({ min: 0, max: 1000 }),
              converted: faker.number.int({ min: 0, max: 500 })
            },
            status: faker.helpers.arrayElement(['active', 'draft', 'archived', 'pending_approval']),
            createdBy: faker.person.fullName(),
            approvedBy: faker.datatype.boolean() ? faker.person.fullName() : null,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: templates,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: templates.filter(t => t.status === 'active').length,
              total_sent: templates.reduce((sum, t) => sum + t.usage.sent, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'campaigns':
        if (method === 'GET') {
          const campaigns = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(3),
            description: faker.lorem.paragraph(),
            type: faker.helpers.arrayElement(['email', 'sms', 'push', 'social', 'multichannel']),
            status: faker.helpers.arrayElement(['draft', 'scheduled', 'running', 'paused', 'completed', 'cancelled']),
            target: {
              audience: faker.helpers.arrayElement(['all_users', 'segment', 'list', 'custom']),
              size: faker.number.int({ min: 100, max: 100000 }),
              filters: faker.helpers.arrayElements(['location', 'age', 'interests', 'behavior'], { min: 1, max: 4 })
            },
            schedule: {
              startDate: faker.date.future(),
              endDate: faker.date.future(),
              timezone: faker.location.timeZone(),
              frequency: faker.helpers.arrayElement(['once', 'daily', 'weekly', 'monthly'])
            },
            content: {
              subject: faker.lorem.words(5),
              preview: faker.lorem.sentence(),
              templateId: faker.string.uuid(),
              attachments: faker.helpers.arrayElements([
                { name: faker.system.fileName(), size: faker.number.int({ min: 1024, max: 1048576 }) }
              ], { min: 0, max: 3 })
            },
            goals: {
              primary: faker.helpers.arrayElement(['awareness', 'engagement', 'conversion', 'retention']),
              kpis: faker.helpers.arrayElements(['open_rate', 'click_rate', 'conversion_rate', 'revenue'], { min: 2, max: 4 }),
              targets: {
                openRate: faker.number.float({ min: 10, max: 50, fractionDigits: 1 }),
                clickRate: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
                conversionRate: faker.number.float({ min: 0.1, max: 5, fractionDigits: 1 })
              }
            },
            performance: {
              sent: faker.number.int({ min: 0, max: 100000 }),
              delivered: faker.number.int({ min: 0, max: 95000 }),
              opened: faker.number.int({ min: 0, max: 30000 }),
              clicked: faker.number.int({ min: 0, max: 5000 }),
              converted: faker.number.int({ min: 0, max: 1000 }),
              unsubscribed: faker.number.int({ min: 0, max: 500 }),
              complained: faker.number.int({ min: 0, max: 50 })
            },
            budget: {
              allocated: faker.number.float({ min: 100, max: 50000, fractionDigits: 2 }),
              spent: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }),
              currency: 'USD'
            },
            createdBy: faker.person.fullName(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: campaigns,
            meta: {
              total: count,
              page: page,
              per_page: count,
              running_count: campaigns.filter(c => c.status === 'running').length,
              total_sent: campaigns.reduce((sum, c) => sum + c.performance.sent, 0)
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'conversations':
        if (method === 'GET') {
          const conversations = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            title: faker.lorem.words(3),
            participants: Array.from({ length: faker.number.int({ min: 2, max: 10 }) }, () => ({
              id: faker.string.uuid(),
              name: faker.person.fullName(),
              avatar: faker.image.avatar(),
              role: faker.helpers.arrayElement(['customer', 'agent', 'supervisor', 'bot']),
              joinedAt: faker.date.past()
            })),
            status: faker.helpers.arrayElement(['active', 'closed', 'pending', 'escalated']),
            priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
            category: faker.helpers.arrayElement(['support', 'sales', 'billing', 'technical', 'general']),
            channel: faker.helpers.arrayElement(['chat', 'email', 'phone', 'social', 'web_form']),
            tags: faker.helpers.arrayElements(['urgent', 'vip', 'first_time', 'repeat', 'escalated'], { min: 0, max: 4 }),
            lastMessage: {
              id: faker.string.uuid(),
              content: faker.lorem.sentence(),
              sender: faker.person.fullName(),
              timestamp: faker.date.recent()
            },
            metrics: {
              messageCount: faker.number.int({ min: 1, max: 100 }),
              responseTime: faker.number.int({ min: 1, max: 3600 }),
              resolutionTime: faker.number.int({ min: 60, max: 86400 }),
              satisfaction: faker.number.int({ min: 1, max: 5 })
            },
            assignedTo: faker.datatype.boolean() ? {
              id: faker.string.uuid(),
              name: faker.person.fullName(),
              avatar: faker.image.avatar()
            } : null,
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
            closedAt: faker.datatype.boolean() ? faker.date.recent() : null
          }));
          res.status(200).json({
            data: conversations,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: conversations.filter(c => c.status === 'active').length,
              avg_response_time: conversations.reduce((sum, c) => sum + c.metrics.responseTime, 0) / conversations.length
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

      case 'webhooks':
        if (method === 'GET') {
          const webhooks = Array.from({ length: count }, () => ({
            id: faker.string.uuid(),
            name: faker.lorem.words(2),
            description: faker.lorem.sentence(),
            url: faker.internet.url(),
            method: faker.helpers.arrayElement(['POST', 'PUT', 'PATCH']),
            events: faker.helpers.arrayElements([
              'message.received', 'message.sent', 'user.created', 'user.updated',
              'campaign.sent', 'campaign.opened', 'campaign.clicked', 'email.bounced'
            ], { min: 1, max: 5 }),
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': faker.string.alphanumeric(32),
              'User-Agent': 'Communication-API-Webhook/1.0'
            },
            secret: faker.string.alphanumeric(64),
            status: faker.helpers.arrayElement(['active', 'inactive', 'failed', 'pending']),
            retryPolicy: {
              maxRetries: faker.number.int({ min: 0, max: 5 }),
              retryDelay: faker.number.int({ min: 1, max: 300 }),
              backoffStrategy: faker.helpers.arrayElement(['fixed', 'exponential', 'linear'])
            },
            stats: {
              totalDelivered: faker.number.int({ min: 0, max: 10000 }),
              totalFailed: faker.number.int({ min: 0, max: 100 }),
              avgResponseTime: faker.number.int({ min: 50, max: 5000 }),
              lastDelivered: faker.date.recent(),
              lastFailed: faker.datatype.boolean() ? faker.date.recent() : null
            },
            createdBy: faker.person.fullName(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }));
          res.status(200).json({
            data: webhooks,
            meta: {
              total: count,
              page: page,
              per_page: count,
              active_count: webhooks.filter(w => w.status === 'active').length,
              total_delivered: webhooks.reduce((sum, w) => sum + w.stats.totalDelivered, 0)
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
              totalMessages: faker.number.int({ min: 10000, max: 1000000 }),
              totalConversations: faker.number.int({ min: 1000, max: 50000 }),
              totalContacts: faker.number.int({ min: 500, max: 10000 }),
              activeUsers: faker.number.int({ min: 100, max: 5000 })
            },
            engagement: {
              messagesPerDay: faker.number.float({ min: 100, max: 5000, fractionDigits: 1 }),
              responseRate: faker.number.float({ min: 60, max: 95, fractionDigits: 1 }),
              avgResponseTime: faker.number.int({ min: 30, max: 1800 }),
              satisfactionScore: faker.number.float({ min: 3, max: 5, fractionDigits: 1 })
            },
            channels: {
              email: {
                sent: faker.number.int({ min: 1000, max: 50000 }),
                delivered: faker.number.int({ min: 900, max: 45000 }),
                opened: faker.number.int({ min: 300, max: 15000 }),
                clicked: faker.number.int({ min: 50, max: 3000 })
              },
              sms: {
                sent: faker.number.int({ min: 500, max: 10000 }),
                delivered: faker.number.int({ min: 450, max: 9000 }),
                responses: faker.number.int({ min: 50, max: 1000 })
              },
              chat: {
                conversations: faker.number.int({ min: 100, max: 2000 }),
                messages: faker.number.int({ min: 1000, max: 20000 }),
                avgDuration: faker.number.int({ min: 300, max: 3600 })
              }
            },
            campaigns: {
              total: faker.number.int({ min: 10, max: 100 }),
              active: faker.number.int({ min: 1, max: 20 }),
              completed: faker.number.int({ min: 5, max: 80 }),
              avgConversionRate: faker.number.float({ min: 1, max: 15, fractionDigits: 1 })
            },
            period: 'last_30_days',
            updatedAt: new Date().toISOString()
          };
          res.status(200).json({
            data: analytics,
            meta: {
              refresh_interval: 300000,
              last_updated: new Date().toISOString()
            }
          });
        } else {
          res.status(405).json({ error: 'Method not allowed' });
        }
        break;

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