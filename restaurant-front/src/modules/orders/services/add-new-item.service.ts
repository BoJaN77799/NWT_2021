import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AddNewItem } from '../models/add-new-item';

@Injectable({
  providedIn: 'root'
})
export class AddNewItemService {

  private itemMessageSource = new Subject<AddNewItem>();
  public itemMessage$ = this.itemMessageSource.asObservable();

  constructor() { }

  sendMessage(newItem : AddNewItem) {
    this.itemMessageSource.next(newItem);
  }


}
