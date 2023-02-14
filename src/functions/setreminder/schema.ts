export default {
    type: 'object',
    properties: {
        user: { type: 'string' },
        due: { type: 'string', format: 'date-time' },
        notificationType: { type: 'string', enum: ['mobile', 'email'] },
        message: { type: 'string' },
    },
    required: ['user', 'due', 'notificationType', 'message'],
} as const;
