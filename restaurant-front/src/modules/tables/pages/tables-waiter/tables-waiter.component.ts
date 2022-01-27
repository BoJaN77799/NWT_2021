import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { OrderDTO } from '../../models/order-dto';
import { OrderItemDTO } from '../../models/order-item-dto';
import { TableWaiterDTO } from '../../models/table-waiter-dto';
import { TablesService } from '../../services/tables-service/tables.service';

@Component({
  selector: 'app-tables-waiter',
  templateUrl: './tables-waiter.component.html',
  styleUrls: ['./tables-waiter.component.scss']
})
export class TablesWaiterComponent implements OnInit {

  //todo naci manje slike za konobara

  public maxNumberOfTables: number = 12;
  public numberOfFloors: number = 3;
  public currentFloor: number = 0;

  public tables: TableWaiterDTO[] = [];
  public selectedOrder: OrderDTO | undefined;
  public selectedTable: TableWaiterDTO | undefined;

  constructor(private tablesService: TablesService, private snackBarService: SnackBarService, private router: Router) { }

  ngOnInit(): void {
    this.tablesService.getAllFromFloorWaiter(0).subscribe((res) => {
      if (res != null) {
        this.tables = res;
      }
    });
    this.tablesService.getFloorTablesInfo().subscribe((res) => {
      if (res != null) {
        this.maxNumberOfTables = res.maxNumberOfTables;
        this.numberOfFloors = res.numberOfFloors;
      }
    });
  }

  public tableClick(table: TableWaiterDTO) {
    if (!table.occupied) {
      this.router.navigate(["rest-app/orders/create-order-page/" + table.id]);
      return;
    }

    if (!table.orderIsMine)
      return;
    this.tablesService.getOrderForTable(table.id).subscribe((res) => {
      if (res.body != null) {
        this.selectedOrder = res.body;
        this.selectedTable = table;
        //todo err
      }
    });
  }

  public deliverItem(id: number) {
    this.tablesService.deliverOrderToTable(id).subscribe((res) => {
      if (this.selectedOrder) {
        for (let orderItem of this.selectedOrder.orderItems) {
          if (orderItem.id === id) {
            orderItem.status = "DELIVERED";
            break;
          }
        }

        this.tablesService.getAllFromFloorWaiter(this.currentFloor).subscribe((res) => {
          if (res != null) {
            this.tables = res;
          }
        });

        if (res.body != null)
          this.snackBarService.openSnackBar(res.body);
        //todo err
      }
    });
  }

  public goToUpdateOrder(): void {
    if (!this.selectedOrder)
      return;

    this.router.navigate(["rest-app/orders/update-order-page/" + this.selectedOrder.id]);
  }

  public finishOrder(): void {
    if (!this.selectedOrder)
      return;

    this.tablesService.finishOrder(this.selectedOrder.id).subscribe((res) => {
      if (res.body != null) {
        this.snackBarService.openSnackBar(res.body);

        this.tablesService.getAllFromFloorWaiter(this.currentFloor).subscribe((res) => {
          if (res != null) {
            this.tables = res;
          }
        });
      }
    });
  }

  public nextFloor() {
    if (this.currentFloor != this.numberOfFloors - 1) {
      this.currentFloor += 1;
      this.tablesService.getAllFromFloorWaiter(this.currentFloor).subscribe((res) => {
        if (res != null) {
          this.tables = res;
        }
      });
    }
  }

  public previousFloor() {
    if (this.currentFloor != 0) {
      this.currentFloor -= 1;
      this.tablesService.getAllFromFloorWaiter(this.currentFloor).subscribe((res) => {
        if (res != null) {
          this.tables = res;
        }
      });
    }
  }

  public closeOrderView() {
    this.selectedOrder = undefined;
    this.selectedTable = undefined;
  }

  public determineImage(status: string): string {
    if (status === "IN PROGRESS") {
      return "https://www.clipartmax.com/png/full/13-132525_acquisitions-divestitures-hourglass.png";
    } else if (status === "READY") {
      return "https://www.clipartmax.com/png/full/5-50571_school-bell-clip-art-3-clipartbarn-clipart-notification-bell-icon.png";
    } else if (status === "FINISHABLE") {
      return "https://www.clipartmax.com/png/full/177-1778827_green-tick-clipart-big-green-green-checkmark-transparent-background.png";
    } else if (status === "NEW") {
      return "https://www.clipartmax.com/png/full/443-4437782_mail-clipart-sent-mail-email-sent-png.png";
    } else {
      return "";
    }
  }

}
