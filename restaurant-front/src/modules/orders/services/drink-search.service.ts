import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { DrinkSearchDTO } from '../models/drink-search-dto';
import { Pageable } from 'src/modules/shared/models/pageable';

@Injectable({
  providedIn: 'root'
})
export class DrinkSearchService {

  private headers = new HttpHeaders()
  .set("Content-Type", 'application/json');

  constructor(private httpClient: HttpClient) { }

  searchDrink(drinkSearchDTO: DrinkSearchDTO, pageable: Pageable): Observable<HttpResponse<Item[]>> {

    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    let params = this.createParams(drinkSearchDTO, pageable);

    return this.httpClient.get<HttpResponse<Item[]>>(`restaurant/api/drinks${params}`, queryParams);
  }

  createParams(drinkSearchDTO: DrinkSearchDTO, pageable: Pageable) : string {
    return `?${this.createSearchParams(drinkSearchDTO)}&${this.createPageableParams(pageable)}`;
  }

  createSearchParams(drinkSearchDTO: DrinkSearchDTO) {
    let name: string = drinkSearchDTO.name;
    let category: string = drinkSearchDTO.category;

    return `name=${name}&category=${category}`;
  }

  createPageableParams(pageable: Pageable) : string {
    let page: number = pageable.page;
    let size: number = pageable.size;
    let sort: string = pageable.sort;

    return `page=${page}&size=${size}&sort=${sort}`;
  } 

}