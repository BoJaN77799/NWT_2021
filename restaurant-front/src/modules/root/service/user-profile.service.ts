import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoView } from 'src/modules/shared/models/user-info-view';
import { UserUpdate } from '../models/user-update';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  updateUser(user: UserUpdate, img: File | undefined): Observable<HttpResponse<String>> {
    let queryParams = {};

    queryParams = {
      observe: 'response',
      responseType: 'text'
    };

    const formData: any = new FormData();
    formData.append("id", user.id);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("address", user.address);
    formData.append("telephone", user.telephone);
    if (img)
      formData.append("image", img);

    return this.http.put<HttpResponse<String>>("restaurant/api/users", formData, queryParams);
  }

  getUserInfo(id: number): Observable<HttpResponse<UserInfoView>> {
    let queryParams = {};

    queryParams = {
      headers: this.headers,
      observe: 'response'
    };


    return this.http.get<HttpResponse<UserInfoView>>("restaurant/api/users/get_user_info/" + id, queryParams);
  }

}
