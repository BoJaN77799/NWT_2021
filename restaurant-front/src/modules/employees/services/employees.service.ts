import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BonusDTO } from '../models/BonusDTO';
import { SalaryDTO } from '../models/SalaryDTO';
import { EmployeeDTO } from '../models/EmployeeDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  findAllEmployees(page: number, size: number): Observable<HttpResponse<EmployeeDTO[]>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: "response",
      params: new HttpParams()
        .set("page", String(page))
        .append("size", String(size)),
    };

    return this.http.get<HttpResponse<EmployeeDTO[]>>("restaurant/api/employees/findAll", queryParams);
  }
}
