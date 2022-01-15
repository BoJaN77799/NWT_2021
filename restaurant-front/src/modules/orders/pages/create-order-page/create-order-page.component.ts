import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { DrinkSearchService } from '../../services/drink-search.service';
import { FoodSearchService } from '../../services/food-search.service';

@Component({
  selector: 'app-create-order-page',
  templateUrl: './create-order-page.component.html',
  styleUrls: ['./create-order-page.component.scss']
})
export class CreateOrderPageComponent implements OnInit {

  pageSize: number;
  totalItemsFood: number;
  totalItemsDrink: number;

  foodItems: Item[] = [];
  drinkItems: Item[] = []

  constructor(private foodSearchService: FoodSearchService, private drinkSearchService: DrinkSearchService) {
    this.pageSize = 6;
    this.totalItemsFood = 0;
    this.totalItemsDrink = 0;
  }

  ngOnInit(): void {
    this.getPageFood(1);
    this.getPageDrink(1);
  }

  getPageFood(nextPage: number): void {
    this.foodSearchService.searchFood(nextPage - 1).subscribe((response) => {   
      if(response.body) {
        this.totalItemsFood = Number(response.headers.get('total-elements'));
        this.foodItems = response.body;
      }
    });
  }

  getPageDrink(nextPage: number): void {
    this.drinkSearchService.searchDrink(nextPage - 1).subscribe((response) => {   
      if(response.body) {
        this.totalItemsDrink = Number(response.headers.get('total-elements'));
        this.drinkItems = response.body;
      }
    });
  }
  
}
