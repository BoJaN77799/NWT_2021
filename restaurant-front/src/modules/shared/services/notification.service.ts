import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification, NotificationWithType } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationMessageSource = new Subject<NotificationWithType>();
  public notificationMessage$ = this.notificationMessageSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAllNotifications(employeeId: number): Observable<HttpResponse<Notification[]>> {

    let queryParams = {};

    queryParams = {
      headers: new HttpHeaders({ "Content-Type": 'application/json' }),
      observe: 'response'
    };

    return this.httpClient.get<HttpResponse<Notification[]>>(`restaurant/api/orderNotifications/` + employeeId, queryParams);
  }

  seenAllNotifications(employeeId: number): Observable<HttpResponse<string>> {
    let queryParams = {};

    queryParams = {
      headers: new HttpHeaders({ "Content-Type": 'application/json' }),
      observe: 'response',
      responseType: 'text'
    };

    return this.httpClient.put<HttpResponse<string>>(`restaurant/api/orderNotifications/setSeenAll`, employeeId, queryParams);
  }

  seenOneNotifications(notifId: number) {
    let queryParams = {};

    queryParams = {
      headers: new HttpHeaders({ "Content-Type": 'application/json' }),
      observe: 'response',
      responseType: 'text'
    };

    return this.httpClient.put<HttpResponse<string>>(`restaurant/api/orderNotifications/setSeenOne`, notifId, queryParams);
  }

  sendNotification(message: any): void {
    this.notificationMessageSource.next(message);
  }

}
