import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class DrinkSearchService {

  private headers = new HttpHeaders()
  .set("Content-Type", 'application/json');

  constructor(private httpClient: HttpClient) { }

  searchDrink(page: number = 0, size: number = 6, name: string = "ALL", 
            category: string = "ALL"): Observable<HttpResponse<Item[]>> {

    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    let params = this.createParams(name, category, page, size);

    return this.httpClient.get<HttpResponse<Item[]>>(`restaurant/api/drinks${params}`, queryParams);
  }

  createParams(name: string, category: string, page: number, size: number) : string {
    return `?${this.createSearchParams(name, category)}&${this.createPageableParams(page, size)}`;
  }

  createSearchParams(name: string, category: string) {
    return `name=${name}&category=${category}`;
  }

  createPageableParams(page: number, size: number) : string {
    return `page=${page}&size=${size}`;
  } 

}