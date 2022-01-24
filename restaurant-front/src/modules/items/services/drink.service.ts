import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drink } from '../model/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  add(newDrink: Drink): Observable<string> {
    return this.http.post("restaurant/api/drinks", newDrink, {
      headers: this.headers,
      responseType: "text",
    });
  }
}
