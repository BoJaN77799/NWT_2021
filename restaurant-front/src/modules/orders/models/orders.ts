import { OrderItem } from "./order-item";

export interface Orders {
    id: number;
    createdAt : number;
    note : String;
    tableId : number;
}

export interface OrderCreationDTO {
    note : String;
    tableId : number;
    waiterId: number,
    orderItems: OrderItem[];
}