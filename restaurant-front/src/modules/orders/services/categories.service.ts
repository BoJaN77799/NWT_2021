import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private httpClient: HttpClient) { }

  getFoodCategories(): Observable<HttpResponse<string[]>> {
    let queryParams = {};
    queryParams = { headers: this.headers, observe: "response" };

    return this.httpClient.get<HttpResponse<string[]>>("restaurant/api/food/categories", queryParams);
  }

  getDrinkCategories(): Observable<HttpResponse<string[]>> {
    let queryParams = {};
    queryParams = { headers: this.headers, observe: "response" };

    return this.httpClient.get<HttpResponse<string[]>>("restaurant/api/drinks/categories", queryParams);
  }

}
