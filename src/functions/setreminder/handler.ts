import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const setReminder: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    return formatJSONResponse({
        message: `Hello ${event.body.user}, welcome to the exciting Serverless world!`,
        event,
    });
};

export const main = middyfy(setReminder);
