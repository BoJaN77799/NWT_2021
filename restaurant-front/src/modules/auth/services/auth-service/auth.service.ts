import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "src/modules/shared/models/login";
import { Token } from "src/modules/shared/models/token";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  login(auth: Login): Observable<Token> {
    return this.http.post<Token>("restaurant/api/users/login", auth, {
      headers: this.headers,
      responseType: "json",
    });
  }

  logout(): Observable<string> {
    //TODO na backu
    return this.http.get("restaurant/api/users/logout", {
      headers: this.headers,
      responseType: "text",
    });
  }

  isLoggedIn(): boolean {
    if (!localStorage.getItem("user")) {
      return false;
    }
    return true;
  }
}
