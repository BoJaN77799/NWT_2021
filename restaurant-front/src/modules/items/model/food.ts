import { Category } from "src/modules/shared/models/category";
import { FoodType } from "src/modules/shared/models/enums/food-type";
import { ItemType } from "src/modules/shared/models/enums/item-type";
import { Ingredient } from "src/modules/shared/models/ingredient";

export interface Food {
    name: string;
    image: string;
    cost: number;
    ingredients: Ingredient[];
    category: Category;
    currentPrice: number;
    itemType: ItemType;
    type: FoodType;
    description: string;
    recipe: string;
    timeToMake: number;
    deleted: boolean
}

export interface FoodWithIngredients {
    foodId: number,
    ingredients: Ingredient[]
}