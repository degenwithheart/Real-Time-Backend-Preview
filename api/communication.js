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

      default:
        res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}