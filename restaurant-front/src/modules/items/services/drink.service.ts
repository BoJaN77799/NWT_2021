import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemType } from 'src/modules/shared/models/enums/item-type';
import { Category } from 'src/modules/shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor(private http: HttpClient) { }

  add(newDrink: any, img: File | undefined): Observable<HttpResponse<string>> {
    const formData: any = new FormData();
    formData.append("id", -1);
    formData.append("name", newDrink.name);
    formData.append("cost", newDrink.cost);
    formData.append("description", newDrink.description);
    formData.append("image", "");
    let category: Category = { 'id': 1, 'name': newDrink.category };
    formData.append("category", category.name);
    formData.append("itemType", ItemType.DRINK);
    formData.append("deleted", false);
    formData.append("volume", newDrink.volume);

    if (img)
      formData.append("multipartImageFile", img);

    let queryParams = {};

    queryParams = {
      observe: 'response',
      responseType: 'text'
    };

    return this.http.post<HttpResponse<string>>("restaurant/api/drinks", formData, queryParams);
  }
}
