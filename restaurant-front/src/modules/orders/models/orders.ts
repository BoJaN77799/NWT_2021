import { OrderItem } from "./order-item";

export interface Orders {
    id: number;
    createdAt : number;
    note : string;
    tableId : number;
}

export interface OrderCreationDTO {
    note : string;
    tableId : number;
    waiterId: number,
    orderItems: OrderItem[];
}

export interface OrderUpdateDTO extends OrderCreationDTO {
    id: number
}