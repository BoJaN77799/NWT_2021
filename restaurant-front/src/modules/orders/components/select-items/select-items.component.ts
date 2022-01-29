import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PaginationComponent } from 'src/modules/shared/components/pagination/pagination.component';
import { DrinkSearchDTO } from 'src/modules/shared/models/drink-search-dto';
import { FoodSearchDTO } from 'src/modules/shared/models/food-search-dto';
import { Pageable } from 'src/modules/shared/models/pageable';
import { DrinkSearchService } from 'src/modules/shared/services/drink-search.service';
import { FoodSearchService } from 'src/modules/shared/services/food-search.service';
import { MenuNamesService } from 'src/modules/shared/services/menu-names.service';
import { Item } from '../../../shared/models/item';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-select-items',
  templateUrl: './select-items.component.html',
  styleUrls: ['./select-items.component.scss']
})
export class SelectItemsComponent implements OnInit {

  pageSize: number;
  totalItemsFood: number;
  totalItemsDrink: number;
  currentPageFood: number;
  currentPageDrink: number;

  foodItems: Item[] = [];
  drinkItems: Item[] = []

  menus: string[] = [];

  foodCategories: string[];
  drinkCategories: string[];

  foodTypes: string[];

  sortTypes: string[];

  /* Properties for search */
  searchFoodText: string;
  searchDrinkText: string;
  foodMenuSelected: string;
  drinkMenuSelected: string;
  foodCategorySelected: string;
  drinkCategorySelected: string;
  foodTypeSelected: string;
  foodSortSelected: string;
  drinkSortSelected: string;

  @ViewChildren(PaginationComponent) paginations!: QueryList<PaginationComponent>;

  constructor(private foodSearchService: FoodSearchService, private drinkSearchService: DrinkSearchService,
              private categoryService: CategoriesService, private menuNamesService: MenuNamesService) {
    this.pageSize = 6;
    this.totalItemsFood = 0;
    this.totalItemsDrink = 0;
    this.currentPageFood = 0;
    this.currentPageDrink = 0;
    this.foodItems = [];
    this.drinkItems = [];
    this.menus = ['Meni 1', 'Meni 2'];
    this.foodCategories = [];
    this.drinkCategories = [];
    this.foodTypes = ['Appetizer', 'Main dish', 'Desert'];;
    this.searchFoodText = '';
    this.searchDrinkText = '';
    this.foodMenuSelected = '';
    this.drinkMenuSelected = '';
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

    this.menuNamesService.findAllActiveMenuNames().subscribe((response) => {
      if(response.body) {
        this.menus = response.body;
        this.menus.splice(0, 1);
      }
    })

    this.categoryService.getFoodCategories().subscribe((response) => {
      if(response.body)
        this.foodCategories = response.body;
    });

    this.categoryService.getDrinkCategories().subscribe((response) => {
      if(response.body)
        this.drinkCategories = response.body;
    });

  }

  getPageFood(nextPage: number, reset: boolean = false): void {
    this.currentPageFood = nextPage;
    let foodSearchDTO = this.createFoodSearchDTO();
    if(reset) { /* Reset pagination component when caller of this function could change size and order of items */
      this.paginations.first.reset();
      this.currentPageFood = 1;
      nextPage = this.currentPageFood;
    }
    let pageable = this.createPageable(nextPage, this.foodSortSelected);
    
    this.foodSearchService.searchFood(foodSearchDTO, pageable).subscribe((response) => {   
      if(response.body) {
        this.totalItemsFood = Number(response.headers.get('total-elements'));
        this.foodItems = response.body as Item[];
      }
    });
  }

  getPageDrink(nextPage: number, reset: boolean = false): void {
    this.currentPageDrink = nextPage;
    let drinkSearchDTO = this.createDrinkSearchDTO();
    if(reset) {  /* Reset pagination component when caller of this function could change size and order of items */
      this.paginations.last.reset();
      this.currentPageDrink = 1;
      nextPage = this.currentPageDrink;
    }
    let pageable = this.createPageable(nextPage, this.drinkSortSelected);

    this.drinkSearchService.searchDrink(drinkSearchDTO, pageable).subscribe((response) => {   
      if(response.body) {
        this.totalItemsDrink = Number(response.headers.get('total-elements'));
        this.drinkItems = response.body as Item[];
      }
    });
  }

  foodSearchBtnClicked(searchText: string): void {
    this.searchFoodText = searchText;
    this.getPageFood(this.currentPageFood, true);
  }
  
  drinkSearchBtnClicked(searchText: string): void {
    this.searchDrinkText = searchText;
    this.getPageDrink(this.currentPageDrink, true);
  }

  foodMenuChanged(option: any): void {
    if(!option) option = '';

    this.foodMenuSelected = option as string;
    this.getPageFood(this.currentPageFood, true);
  }

  drinkMenuChanged(option: any): void {
    if(!option) option = '';

    this.drinkMenuSelected = option as string;
    this.getPageDrink(this.currentPageDrink, true);
  }

  foodCategoryChanged(option: any): void {
    if(!option) option = '';

    this.foodCategorySelected = option as string;
    this.getPageFood(this.currentPageFood, true);
  }
  
  drinkCategoryChanged(option: any): void {
    if(!option) option = '';

    this.drinkCategorySelected = option as string;
    this.getPageDrink(this.currentPageDrink, true);
  }

  foodTypeChanged(option: any): void {
    if(!option) option = '';
    
    let type: string = this.adjustTypeForBack(option as string);

    this.foodTypeSelected = type;
    this.getPageFood(this.currentPageFood, true);
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
      type: this.foodTypeSelected,
      menu: this.foodMenuSelected
    };

    return foodSearchDTO;
  }

  createDrinkSearchDTO(): DrinkSearchDTO {
    let drinkSearchDTO: DrinkSearchDTO = {
      name: this.searchDrinkText,
      category: this.drinkCategorySelected,
      menu: this.drinkMenuSelected
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
