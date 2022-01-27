import { NotificationType } from "./enums/notification-type";

export interface Notification {
    id: number,
    message: string,
    tableId: number,
    orderId: number
}

export interface NotificationWithType extends Notification {
    type: NotificationType;
}