import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
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

  constructor(private route: ActivatedRoute, private orderService: OrdersService,
    private router: Router, private snackBarService: SnackBarService) {
    this.orderId = 0;
  }

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.params['orderId'];
  }

  updateOrder(): void {
    this.itemsManipulationComponent.sendOrder();
  }

  finishOrder(): void {
    this.orderService.finishOrder(this.orderId).subscribe((response) => {
      if (response.body) {
        this.snackBarService.openSnackBarFast(response.body);
        this.router.navigate(["rest-app/orders/create-order-page/0"]);
      }
    },
      (error) => {
        if (error) {
          this.snackBarService.openSnackBarFast(error.error);
          this.router.navigate(["rest-app/orders/create-order-page/0"]);
        }
      })
  }

}
