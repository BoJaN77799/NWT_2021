import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemMenuDTO } from '../models/ItemMenuDTO';
import { Menu } from '../models/Menu';
import { MenuItemDTO } from '../models/MenuItemDTO';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  createNewMenu(newMenu: string): Observable<HttpResponse<string>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text"
    };
    return this.http.post<HttpResponse<string>>(
      "restaurant/api/menus/createMenu", newMenu, queryParams);
  }

  findAllWithSpecificStatus(status: boolean): Observable<HttpResponse<Menu[]>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
    };
 
    return this.http.get<HttpResponse<Menu[]>>(
      `restaurant/api/menus/findAllWithSpecificStatus/${status}`, queryParams);
  }

  updateMenu(menuName: string): Observable<HttpResponse<string>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text"
    };
    return this.http.post<HttpResponse<string>>(
      "restaurant/api/menus/updateMenu", menuName, queryParams);
  }

  findAllActiveMenuNames(): Observable<HttpResponse<string []>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
    };
    return this.http.get<HttpResponse<string []>>
          ("restaurant/api/menus/findAllActiveMenuNames", queryParams);
  }

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

  removeItemFromMenu(menuItemDTO: MenuItemDTO) {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text"
    };
    return this.http.post<HttpResponse<string>>(
      "restaurant/api/items/removeItemFromMenu", menuItemDTO, queryParams);
  }

  addItemToMenu(menuItemDTO: MenuItemDTO) {
    let queryParams = {};
    queryParams = {
      headers: this.headers, 
      observe: "response",
      responseType: "text"
    };
    return this.http.post<HttpResponse<string>>(
      "restaurant/api/items/addItemToMenu", menuItemDTO, queryParams);
  }
}
