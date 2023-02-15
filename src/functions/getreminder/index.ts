import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'getreminder/{reminderId}',
            },
        },
    ],
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: ['dynamodb:GetItem'],
            Resource: {
                'Fn::GetAtt': ['RemindersTable', 'Arn'],
            },
        },
    ],
};
