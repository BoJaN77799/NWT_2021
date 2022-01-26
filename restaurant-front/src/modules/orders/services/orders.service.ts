import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService } from 'src/modules/shared/services/util/util.service';
import { OrderCreationDTO, Order, OrderUpdateDTO } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient, private utilService: UtilService) { }

  getAll(page: number, size: number): Observable<HttpResponse<Order[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };
    let role = this.utilService.getLoggedUserRole();
    role = role.includes("COOK") ? "Cook" : "Barman";
    return this.http.get<HttpResponse<Order[]>>("restaurant/api/orders/for" + role + "/all", queryParams);
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

  findOneWithOrderItemsForUpdate(orderId: number): Observable<HttpResponse<OrderUpdateDTO>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response"
    };

    return this.http.get<HttpResponse<OrderUpdateDTO>>("restaurant/api/orders/forUpdate/" + orderId, queryParams);
  }

  updateOrder(orderDTO: OrderUpdateDTO): Observable<HttpResponse<string>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text"
    };

    return this.http.put<HttpResponse<string>>("restaurant/api/orders", orderDTO, queryParams);
  }

  acceptOrder(id: number, email: string): Observable<HttpResponse<string>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text",
      params: new HttpParams()
        .set("id", id)
        .append("email", email)
    };
    return this.http.get<HttpResponse<string>>("restaurant/api/orders/accept", queryParams);
  }

  getAllMy(id: number, page: number, size: number): Observable<HttpResponse<Order[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };
    let role = this.utilService.getLoggedUserRole();
    role = role.includes("COOK") ? "Cook" : "Barman";

    return this.http.get<HttpResponse<Order[]>>("restaurant/api/orders/for" + role + "/all/" + id, queryParams);
  }
}
