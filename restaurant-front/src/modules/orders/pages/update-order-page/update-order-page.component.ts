import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsManipulationComponent } from '../../components/items-manipulation/items-manipulation.component';
import { OrderUpdateDTO } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-update-order-page',
  templateUrl: './update-order-page.component.html',
  styleUrls: ['./update-order-page.component.scss']
})
export class UpdateOrderPageComponent implements OnInit {

  @ViewChild(ItemsManipulationComponent)
  private itemsManipulationComponent: ItemsManipulationComponent = {} as ItemsManipulationComponent;

  orderId: number;

  constructor(private route: ActivatedRoute, private orderService: OrdersService) {
    this.orderId = 0;
  }

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.params['orderId'];
  }

  updateOrder(): void {
    this.itemsManipulationComponent.sendOrder();
  }

}
