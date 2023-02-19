import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            stream: {
                type: 'dynamodb',
                arn: {
                    'Fn::GetAtt': ['RemindersTable', 'StreamArn'],
                },
            },
        },
    ],
    iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: [
                'dynamodb:DescribeStream',
                'dynamodb:GetRecords',
                'dynamodb:GetShardIterator',
                'dynamodb:ListStreams',
            ],
            Resource: {
                'Fn::GetAtt': ['RemindersTable', 'Arn'],
            },
        },
    ],
};
