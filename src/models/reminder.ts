export default interface Reminder {
    reminderId: number;
    userId: string;
    notificationType: 'mobile' | 'email';
    createDate: string;
    message: string;
    due: number;
}
