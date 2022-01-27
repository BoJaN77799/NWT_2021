import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../../models/order-dto';
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
  public selectedTable: number | undefined;

  constructor(private tablesService: TablesService) { }

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

  public getOrderInfo(table: TableWaiterDTO) {
    if (!table.occupied)
      return;
    this.tablesService.getOrderForTable(table.id).subscribe((res) => {
      if (res.body != null) {
        this.selectedOrder = res.body;
        this.selectedTable = table.id;
        //todo err
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
