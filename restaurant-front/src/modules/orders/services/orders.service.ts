import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderCreationDTO, Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number): Observable<HttpResponse<Orders[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<HttpResponse<Orders[]>>("restaurant/api/orders/forCook/all", queryParams);
  }

  sendOrder(orderDTO: OrderCreationDTO): Observable<HttpResponse<string>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text"
    };

    return this.http.post<HttpResponse<string>>("restaurant/api/orders", orderDTO, queryParams);
  }
}
