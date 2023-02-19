import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import reminderService from 'src/services';

import schema from './schema';

const setReminder: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const id = Date.now();
    const reminder = await reminderService.createReminder({
        reminderId: id,
        userId: event.body.user,
        createDate: new Date().toString(),
        message: event.body.message,
        notificationType: event.body.notificationType,
        due: new Date(event.body.due).getTime() / 1000,
    });
    return formatJSONResponse({
        message: `Created reminder, reminderId: ${reminder.reminderId}`,
    });
};

export const main = middyfy(setReminder);
