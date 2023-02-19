import { DynamoDBRecord, DynamoDBStreamEvent } from 'aws-lambda';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import Reminder from 'src/models/reminder';
import sendmail from 'sendmail';

const sendReminder = async function (event: DynamoDBStreamEvent) {
    // check that the event is a delete (maybe we can filter this before getting here?)
    event.Records.forEach((record) => {
        if (record.eventName == 'REMOVE') {
            console.log(record);
            // if the record is removed then we need to send out the notification
            const reminder = parseRecord(record);
            const result = sendNotification(reminder);
            console.log(result);
        }
    });
};

function parseRecord(record: DynamoDBRecord): Reminder {
    if (!record.dynamodb?.OldImage) {
        throw new Error('Invalid DynamoDB record.');
    }

    return unmarshall(
        record.dynamodb?.OldImage as {
            [key: string]: AttributeValue;
        },
    ) as Reminder;
}

async function sendNotification(reminder: Reminder) {
    if (reminder.notificationType == 'email') {
        return await sendEmail(reminder);
    } else {
        //send message
        console.log('SMS not implemented');
    }
}

async function sendEmail(reminder: Reminder) {
    // use sendmail to send email notification as this allows more flexibility SES costs money and SNS requires subscribing to a topic
    try {
        sendmail({
            from: 'thisisatest@test.org.au',
            to: reminder.userId,
            subject: 'You have a reminder',
            html: reminder.message,
        });
    } catch (error) {
        return {
            error: true,
            message: error.message,
        };
    }
}

export const main = sendReminder;
