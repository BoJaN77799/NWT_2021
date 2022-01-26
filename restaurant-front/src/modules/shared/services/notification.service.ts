import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  getAllNotifications(employeId: number): Observable<HttpResponse<Notification[]>> {

    let queryParams = {};

    queryParams = {
      headers: new HttpHeaders({ "Content-Type": 'application/json' }),
      observe: 'response'
    };

    return this.httpClient.get<HttpResponse<Notification[]>>(`restaurant/api/orderNotifications/` + employeId, queryParams);
  }
}
