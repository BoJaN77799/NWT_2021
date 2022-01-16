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

  /* 
    Sabskrajbovati se na promene u itemMessageSource preko itemMessage$
    https://youtu.be/oj6Tae2oSo0?t=444
  */

  sendItem(newItem : AddNewItem) {
    this.itemMessageSource.next(newItem);
  }

}
