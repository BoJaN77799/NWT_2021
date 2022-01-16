import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  foodCategories: string[];
  drinkCategories: string[];

  constructor(private foodSearchService: FoodSearchService, private drinkSearchService: DrinkSearchService) {
    this.pageSize = 6;
    this.totalItemsFood = 0;
    this.totalItemsDrink = 0;
    this.foodCategories = [];
    this.drinkCategories = [];
  }

  ngOnInit(): void {
    this.getPageFood(1);
    this.getPageDrink(1);

    /* Procitati kategorije sa beka i dodati ih u liste */
    this.foodCategories = ['did', 'didnt', 'didnot'];
    this.drinkCategories = ['did', 'didnt', 'didnot'];
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

  foodSearchBtnClicked(searchText: string): void {
    alert(searchText);
  }
  
  drinkSearchBtnClicked(searchText: string): void {
    alert(searchText);
  }

  foodOptionChanged(option: any): void {
    if(option) {
      alert(option);
    }
    
  }
  
  drinkOptionChanged(option: any): void {
    if(option) {
      alert(option);
    }
  }

}
