import { Category } from "./category";

export interface Item {
    id: number,
    name: string,
    description: string,
    price: number,
    category: Category,
    imgSrc: string,
    itemType: string
}