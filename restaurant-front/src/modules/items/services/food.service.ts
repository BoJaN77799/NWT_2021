import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/modules/shared/models/ingredient';
import { Food } from '../model/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  add(newFood: Food): Observable<string> {
    return this.http.post("restaurant/api/food", newFood, {
      headers: this.headers,
      responseType: "text",
    });
  }

  loadIngredients(): Observable<HttpResponse<Ingredient[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
    };

    return this.http.get<HttpResponse<Ingredient[]>>("restaurant/api/ingredients/all", queryParams);
  }

}
