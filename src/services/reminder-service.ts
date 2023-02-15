import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
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

    async getReminder(id: number): Promise<Reminder> {
        const getParams = {
            TableName: this.TableName,
            Key: {
                reminderId: id,
            },
        };
        try {
            const data = await this.docClient.send(new GetCommand(getParams));
            return data.Item as Reminder;
        } catch (error) {
            console.log(error);
        }
    }
}
