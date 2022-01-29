import { DrinkSearchDTO } from "./drink-search-dto";

export interface FoodSearchDTO extends DrinkSearchDTO{
    type: string;
}