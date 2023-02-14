import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const REGION = process.env.AWS_REGION ?? 'ap-southeast-2';
// Create an Amazon DynamoDB service client object.
export const ddbClient = new DynamoDBClient({ region: REGION });
