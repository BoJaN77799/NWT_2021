import { OrderItemDTO } from "./order-item-dto";

export interface OrderDTO {
    id: number;
    orderItems: OrderItemDTO[];
}