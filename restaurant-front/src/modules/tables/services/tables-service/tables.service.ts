import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableAdminDTO } from 'src/modules/tables/models/table-admin-dto';
import { FloorTablesInfo } from '../../models/floor-tables-info';
import { TableCreateDTO } from '../../models/table-create-dto';
import { TableUpdateDTO } from '../../models/table-update-dto';

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

  addTable(table: TableAdminDTO): Observable<HttpResponse<TableAdminDTO>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };

    let tableDTO : TableCreateDTO = {floor: table.floor, x: table.x, y: table.y};

    return this.http.post<HttpResponse<TableAdminDTO>>("restaurant/api/tables", tableDTO, queryParams);
  }

  updateTable(tableDTO: TableUpdateDTO): Observable<HttpResponse<string>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    };

    return this.http.put<HttpResponse<string>>("restaurant/api/tables", tableDTO, queryParams);
  }

  deleteTable(id: number): Observable<HttpResponse<string>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    };

    return this.http.delete<HttpResponse<string>>("restaurant/api/tables/" + id, queryParams);
  }

  getFloorTablesInfo(): Observable<FloorTablesInfo> {
    let queryParams = {};

    queryParams = {
      headers: this.headers
    };

    return this.http.get<FloorTablesInfo>("restaurant/api/tables/info", queryParams);
  }
}