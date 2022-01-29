import { Category } from "./category";

export interface Item {
    id: number,
    name: string,
    description: string,
    price: number,
    category: Category,
    image: string,
    itemType: string
}