import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsManipulationComponent } from '../../components/items-manipulation/items-manipulation.component';
import { OrderItem } from '../../models/order-item';


@Component({
  selector: 'app-create-order-page',
  templateUrl: './create-order-page.component.html',
  styleUrls: ['./create-order-page.component.scss']
})
export class CreateOrderPageComponent implements OnInit {

  @ViewChild(ItemsManipulationComponent)
  private itemsManipulationComponent: ItemsManipulationComponent = {} as ItemsManipulationComponent;

  tableId: number;

  constructor(private route: ActivatedRoute) {
    this.tableId = 0;
  }

  ngOnInit(): void {
    this.tableId = +this.route.snapshot.params['tableId'];
  }

  sendOrder(): void {
    this.itemsManipulationComponent.sendOrder();
  }
}
