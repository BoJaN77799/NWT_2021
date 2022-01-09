import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Sales } from '../models/sales';
import { IncomeExpenses } from '../models/income-expenses';
import { observeNotification } from 'rxjs/internal/Notification';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getSalesTest(): Observable<HttpResponse <Sales[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };
    // dd.MM.yyyy.11.12.2021.
    
    return this.http.get<HttpResponse <Sales[]>>
        ("restaurant/api/reports/getReportsSales/11.08.2021.-11.12.2021.", queryParams);
  }

}
