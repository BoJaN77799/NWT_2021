import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Sales } from '../models/sales';
import { IncomeExpenses } from '../models/income-expenses';
import { UserReportDTO } from '../models/user-report-dto';


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
        ("restaurant/api/reports/getReportsSales/15.11.2021.-13.01.2022.", queryParams);
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
        ("restaurant/api/reports/getIncomeExpenses/14.11.2021.-14.01.2022.", queryParams);
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

  getActivityTest(): Observable<HttpResponse <UserReportDTO []>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    return this.http.get<HttpResponse <UserReportDTO []>>
        ("restaurant/api/reports/activity/15.11.2021.-13.01.2022.", queryParams);
  }

  getActivity(dateFrom: string, dateTo: string): Observable<HttpResponse <UserReportDTO []>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    return this.http.get<HttpResponse <UserReportDTO []>>
        (`restaurant/api/reports/activity/${dateFrom}-${dateTo}`, queryParams);
  }
}
