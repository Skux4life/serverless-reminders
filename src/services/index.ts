import { ddbDocClient } from '@libs/ddb-document-client';
import ReminderService from './reminder-service';

const reminderService = new ReminderService(ddbDocClient);
export default reminderService;
