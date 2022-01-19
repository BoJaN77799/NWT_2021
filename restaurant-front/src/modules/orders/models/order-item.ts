export interface OrderItem {
    id: number | null,
    itemId: number,
    name: string,
    quantity: number,
    price: number,
    priority: number | null
}