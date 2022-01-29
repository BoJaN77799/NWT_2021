import { PriceItemDTO } from "./price-item-dto";

export interface Sales {
    itemId: number;
    name : string;
    priceCount : number;
    itemCount : number;
    salesPerMonth: Map<string, PriceItemDTO>;
}