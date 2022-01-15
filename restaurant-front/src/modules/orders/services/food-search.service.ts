import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class FoodSearchService {

  private headers = new HttpHeaders()
    .set("Content-Type", 'application/json')
    .set('observe', 'response');

  constructor(private httpClient: HttpClient) { }

  searchFood(name: string = "ALL", category: string = "ALL", type: string = "ALL",
             page: number = 0, size: number = 6): Observable<HttpResponse <Item[]>> {

    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    let params = this.createParams(name, category, type, page, size); 
    return this.httpClient.get<HttpResponse <Item[]>>(`restaurant/api/food${params}`, queryParams);
  }

  createParamsString(name: string, category: string, type: string) {
    return `name=${name}&category=${category}&type=${type}`;
  }

  createPageableString(page: number, size: number) : string {
    return `page=${page}&size=${size}`;
  } 

  createParams(name: string, category: string, type: string, page: number, size: number) : string {
    return `?${this.createParamsString(name, category, type)}&${this.createPageableString(page, size)}`;
  }
}
