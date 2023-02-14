import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'setreminder',
                request: {
                    schemas: {
                        'application/json': schema,
                    },
                },
            },
        },
    ],
    iamRoleStatments: [
        {
            Effect: 'Allow',
            Action: ['dynamodb:PutItem'],
            Resource: {
                'Fn::GetAtt': ['RemindersTable', 'Arn'],
            },
        },
    ],
};
