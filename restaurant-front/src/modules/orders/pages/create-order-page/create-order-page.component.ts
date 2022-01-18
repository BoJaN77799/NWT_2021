import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../models/order-item';


@Component({
  selector: 'app-create-order-page',
  templateUrl: './create-order-page.component.html',
  styleUrls: ['./create-order-page.component.scss']
})
export class CreateOrderPageComponent implements OnInit {

  oi1: OrderItem = { price: 120, id: 1, name: 'Caj', quantity: 2 }
  oi2: OrderItem = { price: 200, id: 2, name: 'Coca Cola', quantity: 4 }
  oi3: OrderItem = { price: 100, id: 3, name: 'Zajecarsko pivo', quantity: 6 }
  oi4: OrderItem = { price: 80, id: 4, name: 'Los caj', quantity: 2 }

  ois: OrderItem[] = [ this.oi1, this.oi2, this.oi3, this.oi4 ]

  constructor() {}

  ngOnInit(): void {}
}
