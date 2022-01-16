import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pageable } from 'src/modules/shared/models/pageable';
import { DrinkSearchDTO } from '../../models/drink-search-dto';
import { FoodSearchDTO } from '../../models/food-search-dto';
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
  currentPageFood: number;
  currentPageDrink: number;

  foodItems: Item[] = [];
  drinkItems: Item[] = []

  foodCategories: string[];
  drinkCategories: string[];

  foodTypes: string[];

  sortTypes: string[];

  /* Properties for search */
  searchFoodText: string;
  searchDrinkText: string;
  foodCategorySelected: string;
  drinkCategorySelected: string;
  foodTypeSelected: string;
  foodSortSelected: string;
  drinkSortSelected: string;

  constructor(private foodSearchService: FoodSearchService, private drinkSearchService: DrinkSearchService) {
    this.pageSize = 6;
    this.totalItemsFood = 0;
    this.totalItemsDrink = 0;
    this.currentPageFood = 0;
    this.currentPageDrink = 0;
    this.foodCategories = [];
    this.drinkCategories = [];
    this.foodTypes = ['Appetizer', 'Main dish', 'Desert'];;
    this.searchFoodText = '';
    this.searchDrinkText = '';
    this.foodCategorySelected = '';
    this.drinkCategorySelected = '';
    this.foodTypeSelected = '';
    this.foodSortSelected = '';
    this.drinkSortSelected = '';
    this.sortTypes = ['Name ascending', 'Name descending', 'Price ascending', 'Price descending'];
  }

  ngOnInit(): void {
    this.getPageFood(1);
    this.getPageDrink(1);

    /* Procitati kategorije sa beka i dodati ih u liste */
    this.foodCategories = ['did', 'didnt', 'didnot'];
    this.drinkCategories = ['did', 'didnt', 'didnot'];
  }

  getPageFood(nextPage: number): void {
    this.currentPageFood = nextPage;
    let foodSearchDTO = this.createFoodSearchDTO();
    let pageable = this.createPageable(nextPage, this.foodSortSelected);

    this.foodSearchService.searchFood(foodSearchDTO, pageable).subscribe((response) => {   
      if(response.body) {
        this.totalItemsFood = Number(response.headers.get('total-elements'));
        this.foodItems = response.body;
      }
    });
  }

  getPageDrink(nextPage: number): void {
    this.currentPageDrink = nextPage;
    let drinkSearchDTO = this.createDrinkSearchDTO();
    let pageable = this.createPageable(nextPage, this.drinkSortSelected);

    this.drinkSearchService.searchDrink(drinkSearchDTO, pageable).subscribe((response) => {   
      if(response.body) {
        this.totalItemsDrink = Number(response.headers.get('total-elements'));
        this.drinkItems = response.body;
      }
    });
  }

  foodSearchBtnClicked(searchText: string): void {
    this.searchFoodText = searchText;
    this.getPageFood(this.currentPageFood);
  }
  
  drinkSearchBtnClicked(searchText: string): void {
    this.searchDrinkText = searchText;
    this.getPageDrink(this.currentPageDrink);
  }

  foodCategoryChanged(option: any): void {
    if(!option) option = '';

    this.foodCategorySelected = option as string;
    this.getPageFood(this.currentPageFood);
  }
  
  drinkCategoryChanged(option: any): void {
    if(!option) option = '';

    this.drinkCategorySelected = option as string;
    this.getPageDrink(this.currentPageDrink);
  }

  foodTypeChanged(option: any): void {
    if(!option) option = '';
    
    let type: string = this.adjustTypeForBack(option as string);

    this.foodTypeSelected = type;
    this.getPageFood(this.currentPageFood);
  }

  adjustTypeForBack(type: string): string {
    type = type.toUpperCase();

    if(type==="MAIN DISH") {
      type = type.split(' ').join('_');
    }

    return type;
  }

  foodSortChanged(option: any): void {
    if(!option) option = '';
    
    let sort: string = option;


    this.foodSortSelected = this.adjustSortForBack(sort);
    this.getPageFood(this.currentPageFood);
  }

  drinkSortChanged(option: any): void {
    if(!option) option = '';
    
    let sort: string = option;

    this.drinkSortSelected = this.adjustSortForBack(sort);
    this.getPageDrink(this.currentPageDrink);
  }

  adjustSortForBack(type: string): string {
    type = type.toLowerCase();
    
    if(type==="name ascending") type = "name,asc"; 
    else if(type==="name descending") type = "name,desc"; 
    else if(type==="price ascending") type = "currentPrice,asc"; 
    else if(type==="price descending") type = "currentPrice,desc"; 
    else type = "id,asc"
    
    return type;
  }

  createFoodSearchDTO(): FoodSearchDTO {
    let foodSearchDTO: FoodSearchDTO = {
      name: this.searchFoodText,
      category: this.foodCategorySelected,
      type: this.foodTypeSelected
    };

    return foodSearchDTO;
  }

  createDrinkSearchDTO(): DrinkSearchDTO {
    let drinkSearchDTO: DrinkSearchDTO = {
      name: this.searchDrinkText,
      category: this.drinkCategorySelected
    };

    return drinkSearchDTO;
  }

  createPageable(page: number, sort: string, size: number = 6): Pageable {
    let pageable: Pageable = {
      page: page - 1,
      size: size,
      sort: (sort==='') ? 'id,asc' : sort
    }

    return pageable;
  }

}
