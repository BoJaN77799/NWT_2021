export interface Item {
    id: number,
    name: string,
    description: string,
    price: number,
    category: Category,
    imgSrc: string
}

export interface Category {
    id: number,
    name: string
}