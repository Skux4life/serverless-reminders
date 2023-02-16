import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'getreminders/{userId}',
            },
        },
    ],
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: ['dynamodb:Query'],
            Resource: {
                'Fn::GetAtt': ['RemindersTable', 'Arn'],
            },
        },
        {
            Effect: 'Allow',
            Action: ['dynamodb:Query'],
            Resource: {
                'Fn::Join': ['/', [{ 'Fn::GetAtt': ['RemindersTable', 'Arn'] }, 'index', 'UserIndex1']],
            },
        },
    ],
};
