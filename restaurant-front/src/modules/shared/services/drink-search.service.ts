import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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
      observe: 'response',
      params: new HttpParams()
        .set("name", drinkSearchDTO.name)
        .append("category", drinkSearchDTO.category)
        .append("menu", drinkSearchDTO.menu)
        .append("page", pageable.page)
        .append("size", pageable.size)
        .append("sort", pageable.sort)
    };

    return this.httpClient.get<HttpResponse<Item[]>>(`restaurant/api/drinks`, queryParams);
  }

}