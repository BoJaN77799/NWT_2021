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

  getSalariesOfEmployee(email: string): Observable<HttpResponse<SalaryDTO[]>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
    };
    return this.http.get<HttpResponse<SalaryDTO[]>>(
      `restaurant/api/salaries/getSalariesOfEmployee/${email}`, queryParams);
  }

  getBonusesOfEmployee(email: string): Observable<HttpResponse<BonusDTO[]>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
    };
    return this.http.get<HttpResponse<BonusDTO[]>>(
      `restaurant/api/bonuses/getBonusesOfEmployee/${email}`, queryParams);
  }

  createNewSalary(newSalary: SalaryDTO): Observable<HttpResponse<string>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text"
    };
    return this.http.post<HttpResponse<string>>
        ("restaurant/api/salaries/createSalary", newSalary, queryParams);
  }

  createNewBonus(newBonus: BonusDTO): Observable<HttpResponse<string>> {
    let queryParams = {};
    queryParams = {
      headers: this.headers,
      observe: "response",
      responseType: "text"
    };
    return this.http.post<HttpResponse<string>>
        ("restaurant/api/bonuses/createBonus", newBonus, queryParams);
  }

  convertBonusesToContent(bonuses: BonusDTO[]): string[] {
    let content : string[]= [];
    for (let i = 0; i < bonuses.length; ++i) {
      content.push("date: " + bonuses[i].date + " amount: " + bonuses[i].amount + " RSD");
    }
    return content;
  }

  convertSalariesToContent(salaries: SalaryDTO[]): string[] {
    let content: string[] = [];
    for (let i = 0; i < salaries.length; ++i) {
      content.push("date from: " + salaries[i].dateFrom + 
      " date to: " + salaries[i].dateTo + " amount: " + salaries[i].amount + " RSD");
    }
    return content;
  }
}
