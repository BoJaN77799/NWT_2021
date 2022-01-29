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

  previewImg: string | undefined;
  selectedImg: File | undefined;

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
    this.food.ingredients
    let foodType = this.getFoodType();
    this.foodService.add(this.foodForm.value, foodType, this.selectedImg).subscribe((toastMessage) => {
      console.log(toastMessage);
      if (toastMessage.body) {
        let foodId = Number(toastMessage.headers.get("food-id"));
        if (foodId >= 1)
          this.foodService.saveIngredients({ foodId: foodId, ingredients: this.food.ingredients }).subscribe((res) => {
            if (res.status === 200)
              this.router.navigate(["/rest-app/orders/orders-page"]);
            if (toastMessage.body)
              this.snackBarService.openSnackBar(toastMessage.body)
          })
      }
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

  public selectImage(event: any) {
    let selectedFiles = event.target.files;


    if (selectedFiles && selectedFiles[0]) {
      this.selectedImg = selectedFiles[0];
      if (this.selectedImg)
        this.food.image = this.selectedImg.name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImg = e.target.result;

      }
      reader.readAsDataURL(selectedFiles[0]);
    }
  }
}

