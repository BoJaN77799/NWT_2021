import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/modules/shared/services/notification.service';
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

  public maxNumberOfTables: number = 12;
  public numberOfFloors: number = 3;
  public currentFloor: number = 0;

  public tables: TableWaiterDTO[] = [];
  public selectedOrder: OrderDTO | undefined;
  public selectedTable: TableWaiterDTO | undefined;

  constructor(private tablesService: TablesService, private snackBarService: SnackBarService, private router: Router, private notificationService: NotificationService) { }

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

    this.notificationService.notificationMessage$.subscribe((notification) => {
      //todo srediti malo kod, mozda u posebnu fju
      let found: boolean = false;
      for (let table of this.tables) {
        if (table.id === notification.tableId) {
          found = true;
          break;
        }
      }

      if (!found)
        return;

      this.tablesService.getTableOrderInfoWaiter(notification.tableId).subscribe((res) => {
        if (res.body != null) {
          for (let i = 0; i < this.tables.length; i++) {
            if (this.tables[i].id === notification.tableId) {
              this.tables[i] = res.body;
              return;
            }
          }
        }
      }, (err) => this.snackBarService.openSnackBar("Error with geting table info!"));
    })
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
      }
    }, (err) => {
      if (err.error)
        this.snackBarService.openSnackBar(String(err.console));
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
      }
    }, (err) => {
      if (err.error)
        this.snackBarService.openSnackBar(String(err.console));
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

        //todo srediti da se samo na frontu menja kad se zavrsi porudzbina, ne da salje na back, i da se zatvori onaj prozorcic
        this.tablesService.getAllFromFloorWaiter(this.currentFloor).subscribe((res) => {
          if (res != null) {
            this.tables = res;
          }
        });
      }
    }, (err) => {
      if (err.error)
        this.snackBarService.openSnackBar(String(err.console));
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
    if (status === "READY") {
      return "assets/bell.png";
    } else if (status === "DELIVERED") {
      return "assets/checkmark.png";
    } else if (status === "CREATED") {
      return "assets/new-order.png";
    } else {
      return "";
    }
  }

}
