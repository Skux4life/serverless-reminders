import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import Reminder from 'src/models/reminder';

export default class ReminderService {
    private TableName = 'RemindersTable';

    constructor(private docClient: DynamoDBDocumentClient) {}

    async createReminder(reminder: Reminder): Promise<Reminder> {
        const putParams = {
            TableName: this.TableName,
            Item: reminder,
        };
        try {
            await this.docClient.send(new PutCommand(putParams));
            return reminder;
        } catch (error) {
            console.log(error);
        }
    }
}
