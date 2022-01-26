import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreate } from '../../models/user-create';
import { UserInfoView } from '../../../shared/models/user-info-view';
import { UserTableView } from '../../models/user-table-view';
import { UserUpdate } from '../../../root/models/user-update';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  deleteUser(id: number): Observable<HttpResponse<String>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    };

    return this.http.delete<HttpResponse<String>>("restaurant/api/users/" + id, queryParams);
  }

  createUser(user: UserCreate, img: File | undefined): Observable<HttpResponse<String>> {
    let queryParams = {};

    queryParams = {
      observe: 'response',
      responseType: 'text'
    };

    const formData: any = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("address", user.address);
    formData.append("gender", user.gender);
    formData.append("userType", user.userType);
    formData.append("telephone", user.telephone);
    formData.append("email", user.email);
    if (img)
      formData.append("image", img);

    return this.http.post<HttpResponse<String>>("restaurant/api/users", formData, queryParams);
  }

  getUserInfo(id: number): Observable<HttpResponse<UserInfoView>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };


    return this.http.get<HttpResponse<UserInfoView>>("restaurant/api/users/get_user_info/" + id, queryParams);
  }

  getUsers(pageNum: number, pageSize: number, sortBy: string | undefined, sortDir: string | undefined): Observable<HttpResponse<UserTableView[]>> {
    let queryParams = {};

    if (sortBy === '' || sortDir === '') {
      queryParams = {
        headers: this.headers,
        params: {
          size: pageSize,
          page: pageNum
        },
        observe: 'response'
      };
    } else {
      queryParams = {
        headers: this.headers,
        params: {
          size: pageSize,
          page: pageNum,
          sort: sortBy + "," + sortDir
        },
        observe: 'response'
      };
    }

    return this.http.get<HttpResponse<UserTableView[]>>("restaurant/api/users", queryParams);
  }

  searchUsers(searchFieldVal: string, userTypeVal: string, pageNum: number, pageSize: number, sortBy: string | undefined, sortDir: string | undefined): Observable<HttpResponse<UserTableView[]>> {
    let queryParams = {};

    if (sortBy === '' || sortDir === '') {
      queryParams = {
        headers: this.headers,
        params: {
          searchField: searchFieldVal,
          userType: userTypeVal,
          size: pageSize,
          page: pageNum
        },
        observe: 'response'
      };
    } else {
      queryParams = {
        headers: this.headers,
        params: {
          searchField: searchFieldVal,
          userType: userTypeVal,
          size: pageSize,
          page: pageNum,
          sort: sortBy + "," + sortDir
        },
        observe: 'response'
      };
    }



    return this.http.get<HttpResponse<UserTableView[]>>("restaurant/api/users/admin_search", queryParams);
  }
}
