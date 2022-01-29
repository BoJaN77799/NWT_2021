import { Category } from "src/modules/shared/models/category";
import { ItemType } from "src/modules/shared/models/enums/item-type";

export interface Drink {
    name: string;
    image: string;
    cost: number;
    category: Category;
    currentPrice: number;
    itemType: ItemType;
    description: String;
    deleted: boolean
    volume: number;
}