import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  public getNoPages(totalItems: number, pageSize: number): number {
    return Math.ceil(totalItems / pageSize);
  }

  public getLoggedUserRole(): string {
    const item = localStorage.getItem("user");

    if (item) {
      const jwt: JwtHelperService = new JwtHelperService();
      return jwt.decodeToken(item).role;
    }
    return "";
  }

  public isUserWorker(): boolean {
    const item = localStorage.getItem("user");

    if (item) {
      const jwt: JwtHelperService = new JwtHelperService();
      let role = jwt.decodeToken(item).role;
      return role !== 'ADMINISTRATOR' && role !== 'MANAGER';
    }
    return false;
  }

  public getLoggedUserEmail(): string {
    const item = localStorage.getItem("user");

    if (item) {
      const jwt: JwtHelperService = new JwtHelperService();
      return jwt.decodeToken(item).sub;
    }
    return "";
  }

  public getLoggedUserId(): number {
    const item = localStorage.getItem("user");

    if (item) {
      const jwt: JwtHelperService = new JwtHelperService();
      return jwt.decodeToken(item).userId;
    }
    return -1;
  }

  public getUserInfo() {
    let queryParams = {};

    queryParams = {
      headers: new HttpHeaders({}),
      observe: "response",
      responseType: "text"
    };
    return this.http.get<HttpResponse<string>>("restaurant/api/users/get_user_info_profile/{id}", queryParams);
  }
}
