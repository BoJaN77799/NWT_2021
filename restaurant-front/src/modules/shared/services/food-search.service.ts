import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/modules/shared/models/pageable';
import { FoodSearchDTO } from '../models/food-search-dto';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class FoodSearchService {

  private headers = new HttpHeaders()
    .set("Content-Type", 'application/json');

  constructor(private httpClient: HttpClient) { }

  searchFood(foodSearchDTO: FoodSearchDTO, pageable: Pageable): Observable<HttpResponse<Item[]>> {

    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response',
      params: new HttpParams()
        .set("name", foodSearchDTO.name)
        .append("category", foodSearchDTO.category)
        .append("type", foodSearchDTO.type)
        .append("menu", foodSearchDTO.menu)
        .append("page", pageable.page)
        .append("size", pageable.size)
        .append("sort", pageable.sort)
    };

    return this.httpClient.get<HttpResponse<Item[]>>(`restaurant/api/food`, queryParams);
  }

}
