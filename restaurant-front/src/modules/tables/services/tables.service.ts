import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableAdminDTO } from 'src/modules/shared/models/table-admin-dto';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  getAllFromFloorAdmin(floor: number): Observable<TableAdminDTO[]> {
    let queryParams = {};

    queryParams = {
      headers: this.headers
    };

    return this.http.get<TableAdminDTO[]>("restaurant/api/tables/" + floor, queryParams);
  }
}
