import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Sales } from '../models/sales';
import { IncomeExpenses } from '../models/income-expenses';


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
    
    return this.http.get<HttpResponse <Sales[]>>
        ("restaurant/api/reports/getReportsSales/11.08.2021.-11.12.2021.", queryParams);
  }

  getSales(dateFrom: string, dateTo: string): Observable<HttpResponse <Sales[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    return this.http.get<HttpResponse <Sales[]>>
        (`restaurant/api/reports/getReportsSales/${dateFrom}-${dateTo}`, queryParams);
  }

  getIncomeExpensesTest(): Observable<HttpResponse <IncomeExpenses>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    return this.http.get<HttpResponse <IncomeExpenses>>
        ("restaurant/api/reports/getIncomeExpenses/11.08.2021.-11.12.2021.", queryParams);
  }

  getIncomeExspenses(dateFrom: string, dateTo: string): Observable<HttpResponse <IncomeExpenses>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };
   
    return this.http.get<HttpResponse <IncomeExpenses>>
        (`restaurant/api/reports/getIncomeExpenses/${dateFrom}-${dateTo}`, queryParams);
  }
}
