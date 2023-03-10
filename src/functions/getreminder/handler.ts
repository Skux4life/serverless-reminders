import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import reminderService from 'src/services';

const getReminder = async (event) => {
    const reminderId = parseInt(event.pathParameters.reminderId);
    const reminder = await reminderService.getReminder(reminderId);
    return formatJSONResponse({
        reminder: reminder,
    });
};

export const main = middyfy(getReminder);
