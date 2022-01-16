import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
      observe: 'response'
    };

    let params = this.createParams(foodSearchDTO, pageable);

    return this.httpClient.get<HttpResponse<Item[]>>(`restaurant/api/food${params}`, queryParams);
  }

  createParams(foodSearchDTO: FoodSearchDTO, pageable: Pageable) : string {
    return `?${this.createSearchParams(foodSearchDTO)}&${this.createPageableParams(pageable)}`;
  }

  createSearchParams(foodSearchDTO: FoodSearchDTO) {
    let name: string = foodSearchDTO.name;
    let category: string = foodSearchDTO.category;
    let type: string = foodSearchDTO.type;

    return `name=${name}&category=${category}&type=${type}`;
  }

  createPageableParams(pageable: Pageable) : string {
    let page: number = pageable.page;
    let size: number = pageable.size;
    let sort: string = pageable.sort;

    return `page=${page}&size=${size}&sort=${sort}`;
  } 
  
}
