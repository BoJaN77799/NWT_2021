import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodType } from 'src/modules/shared/models/enums/food-type';
import { ItemType } from 'src/modules/shared/models/enums/item-type';
import { Ingredient } from 'src/modules/shared/models/ingredient';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { Food } from '../../model/food';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.scss']
})
export class FoodCreateComponent {

  food: Food;
  foodForm: FormGroup;
  foodIngredientsToShow: Ingredient[];
  selected: Ingredient;
  selectedType: string;
  //number: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private foodService: FoodService,
    private snackBarService: SnackBarService
  ) {
    this.food = this.createEmptyFood();
    this.foodIngredientsToShow = [];
    this.foodService.loadIngredients().subscribe((result) => {
      if (result.body)
        this.foodIngredientsToShow = result.body;
      else
        console.log("ingredients empty"); // TODO: toast
    })

    this.foodForm = this.fb.group(
      {
        name: ["", [Validators.required]],
        cost: [0, [Validators.required, Validators.min(50)]],
        category: ["", Validators.required],
        description: ["", Validators.required],
        recipe: ["", Validators.required],
        timeToMake: [0, [Validators.required, Validators.min(2)]],
        type: [0, Validators.required],
      }
    );
    this.selected = {
      id: -1,
      name: "",
      allergen: false
    };
    this.selectedType = ""
  }

  get f() {
    return this.foodForm.controls;
  }

  onSubmit() {
    let choosenIngredients = this.food.ingredients;
    this.food = this.foodForm.value;
    // category is object
    this.food.category = {
      id: -1,
      name: this.foodForm.value['category']
    }
    this.food.itemType = ItemType.FOOD;
    this.food.image = "slicica"; // TODO za sliku
    this.food.deleted = false;
    this.food.currentPrice = -1;
    this.food.type = this.getFoodType();
    this.food.ingredients = choosenIngredients;
    this.foodService.add(this.food).subscribe((toastMessage) => {
      this.snackBarService.openSnackBar(toastMessage);
      this.router.navigate(["/rest-app/orders/orders-page"]);
    });
  }

  getFoodType(): FoodType {
    if (this.selectedType === 'APPETIZER')
      return FoodType.APPETIZER;
    else if (this.selectedType === 'MAIN_DISH')
      return FoodType.MAIN_DISH;
    else
      return FoodType.DESERT;
  }

  createEmptyFood(): Food {
    return {
      name: "",
      image: "putanjica",
      cost: 0,
      ingredients: [],
      category: {
        id: -1,
        name: ""
      },
      currentPrice: 0,
      itemType: ItemType.FOOD,
      type: FoodType.APPETIZER,
      description: "",
      recipe: "",
      timeToMake: 0,
      deleted: false
    }
  }

  reset() {
    this.food.ingredients = [];
  }

  addChoosenIngredient(ingredient: Ingredient) {
    if (ingredient) {
      let found = false;
      this.food.ingredients.forEach(element => {
        if (element.name === ingredient.name) {
          found = true;
          return;
        }
      });
      if (!found)
        this.food.ingredients.push(ingredient);
    }
    this.selected = { id: -1, name: "", allergen: false };
  }

  checkSubmit() {
    return !(this.foodForm.valid && this.selectedType !== "" && this.food.ingredients.length != 0);
  }
}

