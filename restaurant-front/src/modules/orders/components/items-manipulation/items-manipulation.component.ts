import { Component, Input, OnInit } from '@angular/core';
import { ItemQuantitySelection } from '../../models/item-quantity-selection';
import { OrderItem } from '../../models/order-item';
import { AddNewItemService } from '../../services/add-new-item.service';

@Component({
  selector: 'app-items-manipulation',
  templateUrl: './items-manipulation.component.html',
  styleUrls: ['./items-manipulation.component.scss']
})
export class ItemsManipulationComponent implements OnInit {

  @Input()
  orderItems: OrderItem[]

  constructor(private addNewItemService: AddNewItemService) { 
    this.orderItems = [];
  }

  ngOnInit(): void {
    this.addNewItemService.itemMessage$.subscribe((message) =>{
      this.addNewItemToList(message as ItemQuantitySelection);
    });
  }

  addNewItemToList(oi: ItemQuantitySelection): void {
    console.log(oi);
  }

}
