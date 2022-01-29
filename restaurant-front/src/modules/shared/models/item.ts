export interface Item {
    id: number,
    name: string,
    description: string,
    price: number,
    category: Category,
    image: string,
    itemType: string
}

export interface Category {
    id: number,
    name: string
}