import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import reminderService from 'src/services';

const getReminders = async (event) => {
    const userId = event.pathParameters.userId;
    const reminders = await reminderService.getReminders(userId);
    return formatJSONResponse({
        reminders: reminders,
    });
};

export const main = middyfy(getReminders);
