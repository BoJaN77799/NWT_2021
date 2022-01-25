import { OrderItem, OrderItemWithItem } from "./order-item";

export interface Order {
    id: number;
    createdAt: number;
    note: string;
    tableId: number;
    orderItems: OrderItemWithItem[]
    status: string;
    waiterId: number;
    barmenId: number;
    cookId: number;
}

export interface OrderCreationDTO {
    note: string;
    tableId: number;
    waiterId: number,
    orderItems: OrderItem[];
}

export interface OrderUpdateDTO extends OrderCreationDTO {
    id: number
}