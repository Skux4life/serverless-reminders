import type { AWS } from '@serverless/typescript';

import setReminder from '@functions/setreminder';

const serverlessConfiguration: AWS = {
    service: 'reminder-app',
    frameworkVersion: '3',
    plugins: [
        'serverless-esbuild',
        'serverless-iam-roles-per-function',
        'serverless-offline',
        'serverless-dynamodb-local',
    ],
    provider: {
        name: 'aws',
        region: 'ap-southeast-2',
        runtime: 'nodejs18.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
    },
    // import the function via paths
    functions: { setReminder },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node18',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
        dynamodb: {
            start: {
                port: 5000,
                inMemory: true,
                migrate: true,
            },
            stages: 'dev',
        },
    },
    resources: {
        Resources: {
            RemindersTable: {
                Type: 'AWS::DynamoDB::Table',
                Properties: {
                    TableName: 'RemindersTable',
                    AttributeDefinitions: [
                        {
                            AttributeName: 'userid',
                            AttributeType: 'S',
                        },
                        {
                            AttributeName: 'reminderid',
                            AttributeType: 'N',
                        },
                        {
                            AttributeName: 'createdate',
                            AttributeType: 'S',
                        },
                    ],
                    KeySchema: [
                        {
                            AttributeName: 'reminderid',
                            KeyType: 'HASH',
                        },
                    ],
                    GlobalSecondaryIndexes: {
                        IndexName: 'UserIndex',
                        KeySchema: [
                            {
                                AttributeName: 'userid',
                                KeyType: 'HASH',
                            },
                            {
                                AttributeName: 'createdate',
                                KeyType: 'RANGE',
                            },
                        ],
                    },
                    TimeToLiveSpecification: {
                        AttributeName: 'due',
                        Enabled: true,
                    },
                    BillingMode: 'PAY_PER_REQUEST',
                },
            },
        },
    },
};

module.exports = serverlessConfiguration;
