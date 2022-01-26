import { Item } from "src/modules/shared/models/item";

export interface OrderItem {
    id: number | null,
    itemId: number,
    name: string,
    quantity: number,
    price: number,
    priority: number | null
    itemType: string | null
}

export interface OrderItemExtended extends OrderItem {
    item: Item
    status: string
}