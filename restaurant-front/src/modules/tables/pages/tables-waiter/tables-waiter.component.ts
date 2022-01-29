import { Component, OnInit } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { Notification, NotificationWithType } from 'src/modules/shared/models/notification';
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
    this.getAllFromFloor(0);
    this.getFloorTablesInfo();

    this.notificationService.notificationMessage$.subscribe((notification) => {
      let notif: NotificationWithType = notification;
      this.onNotification(notif);
    })
  }

  private getAllFromFloor(floor: number) {
    this.tablesService.getAllFromFloorWaiter(floor).subscribe((res) => {
      if (res != null) {
        this.tables = res;
      }
    });
  }

  private getFloorTablesInfo() {
    this.tablesService.getFloorTablesInfo().subscribe((res) => {
      if (res != null) {
        this.maxNumberOfTables = res.maxNumberOfTables;
        this.numberOfFloors = res.numberOfFloors;
      }
    });
  }

  private updateTableInfo(tableId: number) {
    this.tablesService.getTableOrderInfoWaiter(tableId).subscribe((res) => {
      if (res.body != null) {
        let index = -1;
        for (let i = 0; i < this.tables.length; i++) {
          if (this.tables[i].id === tableId) {
            this.tables[i] = res.body;
            index = i;
            break;
          }
        }

        if (tableId === this.selectedTable?.id) { //da update-ujemo onaj prozor desno od stolova
          this.tablesService.getOrderForTable(tableId).subscribe((res) => {
            if (res.body != null) {
              this.selectedOrder = res.body;
            }
          }, (err) => {
            if (err.error)
              this.snackBarService.openSnackBar(String(err.console));
          });
        }
      }
    }, (err) => this.snackBarService.openSnackBar("Error with geting table info!"));
  }

  private onNotification(notification: NotificationWithType) {
    let foundTable: TableWaiterDTO | undefined = undefined;
    for (let table of this.tables) {
      if (table.id === notification.tableId) {
        foundTable = table;
        break;
      }
    }

    if (!foundTable)
      return;

    this.updateTableInfo(notification.tableId);
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
    if (!this.selectedOrder || !this.selectedTable)
      return;
    let tableId = this.selectedTable ? this.selectedTable.id : -1;

    this.tablesService.deliverOrderToTable(id).subscribe((res) => {
      if (this.selectedOrder) {

        this.updateTableInfo(tableId);

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
    if (!this.selectedOrder || !this.selectedTable)
      return;
    let tableId = this.selectedTable ? this.selectedTable.id : -1;

    this.tablesService.finishOrder(this.selectedOrder.id).subscribe((res) => {
      if (res.body != null) {
        this.snackBarService.openSnackBar(res.body);

        this.selectedTable = undefined;
        this.selectedOrder = undefined;

        for (let i = 0; i < this.tables.length; i++) {
          if (this.tables[i].id === tableId) {
            this.tables[i].occupied = false;
            this.tables[i].orderIsMine = false;
            this.tables[i].orderStatus = "TABLE FREE";
            break;
          }
        }
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
