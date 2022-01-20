import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemMenuDTO } from '../models/ItemMenuDTO';
import { ItemPriceDTO } from '../models/ItemPriceDTO';
import { MenuItemDTO } from '../models/MenuItemDTO';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  findAllItemsWithMenuName(name: string, page: number, size: number): Observable<HttpResponse<ItemMenuDTO[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
      params: new HttpParams()
        .set("name", name)
        .append("page", String(page))
        .append("size", String(size))
        .append("sort", "id"),
    };  
    
    return this.http.get<HttpResponse<ItemMenuDTO[]>>
      ("restaurant/api/items/findAllItemsWithMenuName", queryParams);
  }

  removeItemFromMenu(menuItemDTO: MenuItemDTO): Observable<HttpResponse<string>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text"
    };
    return this.http.post<HttpResponse<string>>
      ("restaurant/api/items/removeItemFromMenu", menuItemDTO, queryParams);
  }

  addItemToMenu(menuItemDTO: MenuItemDTO): Observable<HttpResponse<string>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers, 
      observe: "response",
      responseType: "text"
    };
    return this.http.post<HttpResponse<string>>
      ("restaurant/api/items/addItemToMenu", menuItemDTO, queryParams);
  }
  
  createUpdatePriceOnItem(itemPriceDTO: ItemPriceDTO): Observable<HttpResponse<string>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers, 
      observe: "response" ,
      responseType: "text"
    };
    return this.http.post<HttpResponse<string>>
      ("restaurant/api/items/createUpdatePriceOnItem", itemPriceDTO, queryParams);
  }

  getPricesOfItem(idItem: string): Observable<HttpResponse<ItemPriceDTO[]>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers, 
      observe: "response",
    };
    return this.http.get<HttpResponse<ItemPriceDTO[]>>
      (`restaurant/api/items/getPricesOfItem/${idItem}`, queryParams);
  }

  convertPricesToContent(prices: ItemPriceDTO[]): string[] {
    let content: string[] = [];
    for (let i = 0; i < prices.length; ++i) {
      content.push("date from: " + prices[i].dateFrom + 
      " date to: " + prices[i].dateTo + " amount: " + prices[i].newPrice + " RSD");
    }
    return content;
  }
}
