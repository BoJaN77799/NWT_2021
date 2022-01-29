import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemType } from 'src/modules/shared/models/enums/item-type';
import { FoodSearchDTO } from 'src/modules/shared/models/food-search-dto';
import { Ingredient } from 'src/modules/shared/models/ingredient';
import { Category } from 'src/modules/shared/models/category';
import { Food, FoodWithIngredients } from '../model/food';
import { FoodType } from 'src/modules/shared/models/enums/food-type';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  add(newFood: any, foodType: FoodType, img: File | undefined): Observable<HttpResponse<string>> {
    const formData: any = new FormData();
    formData.append("id", -1);
    formData.append("name", newFood.name);
    formData.append("cost", newFood.cost);
    formData.append("description", newFood.description);
    let category: Category = { 'id': 1, 'name': newFood.category };
    formData.append("category", category.name);
    formData.append("itemType", ItemType.FOOD);
    formData.append("deleted", false);
    formData.append("recipe", newFood.recipe);
    formData.append("timeToMake", newFood.timeToMake);
    formData.append("type", foodType);
    //formData.append("ingredients", new Set(ingreditents))
    if (img) {
      formData.append("multipartImageFile", img);
      formData.append("image", newFood.image);
    }
    else
      formData.append("image", 'food_photos/default_food.jpg');


    let queryParams = {};

    queryParams = {
      observe: 'response',
      responseType: 'text'
    };

    return this.http.post<HttpResponse<string>>("restaurant/api/food", formData, queryParams);
  }

  loadIngredients(): Observable<HttpResponse<Ingredient[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
    };

    return this.http.get<HttpResponse<Ingredient[]>>("restaurant/api/ingredients/all", queryParams);
  }

  saveIngredients(foodWithIngredients: FoodWithIngredients): Observable<HttpResponse<String>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text"
    };

    return this.http.post<HttpResponse<String>>("restaurant/api/ingredients", foodWithIngredients, queryParams);
  }

}
