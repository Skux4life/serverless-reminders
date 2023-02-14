export default {
    type: 'object',
    properties: {
        user: { type: 'string' },
        ttl: { type: 'string', format: 'date-time' },
        notificationType: { type: 'string', enum: ['email', 'sms'] },
        message: { type: 'string' },
    },
    required: ['user', 'ttl', 'notificationType', 'message'],
} as const;
