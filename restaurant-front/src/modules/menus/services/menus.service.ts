import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/Menu';

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

}
