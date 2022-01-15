import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class FoodSearchService {

  private headers = new HttpHeaders()
    .set("Content-Type", 'application/json');

  constructor(private httpClient: HttpClient) { }

  searchFood(page: number = 0, size: number = 6, 
             name: string = "ALL", category: string = "ALL", type: string = "ALL"): Observable<HttpResponse<Item[]>> {

    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    let params = this.createParams(name, category, type, page, size);

    return this.httpClient.get<HttpResponse<Item[]>>(`restaurant/api/food${params}`, queryParams);
  }

  createParams(name: string, category: string, type: string, page: number, size: number) : string {
    return `?${this.createSearchParams(name, category, type)}&${this.createPageableParams(page, size)}`;
  }

  createSearchParams(name: string, category: string, type: string) {
    return `name=${name}&category=${category}&type=${type}`;
  }

  createPageableParams(page: number, size: number) : string {
    return `page=${page}&size=${size}`;
  } 
  
}
