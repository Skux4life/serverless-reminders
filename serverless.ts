import { getReminder, setReminder } from '@functions/index';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
    service: 'reminder-app',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],
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
    functions: { setReminder, getReminder },
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
                            AttributeName: 'userId',
                            AttributeType: 'S',
                        },
                        {
                            AttributeName: 'reminderId',
                            AttributeType: 'N',
                        },
                        {
                            AttributeName: 'createDate',
                            AttributeType: 'S',
                        },
                    ],
                    KeySchema: [
                        {
                            AttributeName: 'reminderId',
                            KeyType: 'HASH',
                        },
                    ],
                    GlobalSecondaryIndexes: [
                        {
                            IndexName: 'UserIndex1',
                            KeySchema: [
                                {
                                    AttributeName: 'userId',
                                    KeyType: 'HASH',
                                },
                                {
                                    AttributeName: 'createDate',
                                    KeyType: 'RANGE',
                                },
                            ],
                            Projection: {
                                ProjectionType: 'ALL', // this may not be neccessary
                            },
                        },
                    ],
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
