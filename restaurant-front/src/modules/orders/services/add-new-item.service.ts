import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ItemQuantitySelection } from '../models/item-quantity-selection';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class AddNewItemService {

  private itemMessageSource = new Subject<ItemQuantitySelection>();
  public itemMessage$ = this.itemMessageSource.asObservable();

  constructor() { }

  /* 
    Sabskrajbovati se na promene u itemMessageSource preko itemMessage$
    https://youtu.be/oj6Tae2oSo0?t=444
  */

  sendItem(newItem : ItemQuantitySelection) {
    this.itemMessageSource.next(newItem);
  }

}
