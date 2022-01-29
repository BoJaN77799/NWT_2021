import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuNamesService {

  private headers = new HttpHeaders().set("Content-Type", 'application/json');

  constructor(private httpClient: HttpClient) { }

  findAllActiveMenuNames(): Observable<HttpResponse<string[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    return this.httpClient.get<HttpResponse<string[]>>(`restaurant/api/menus/findAllActiveMenuNames`, queryParams);
  }
}
