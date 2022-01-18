import { ItemQuantitySelection } from "./item-quantity-selection";

export interface OrderItem extends ItemQuantitySelection {
    price: number
}