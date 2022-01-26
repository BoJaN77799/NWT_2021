import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { Order } from '../../models/order';
import { OrderItemExtended } from '../../models/order-item';
import { OrdersPageComponent } from '../../pages/orders-page/orders-page.component';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements AfterViewInit {

  displayedColumns: string[] = ['itemType', 'name', 'price', 'quantity', 'priority', 'button'];
  dataSource: MatTableDataSource<OrderItemExtended>;
  tempRoute: string;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<OrdersPageComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private _liveAnnouncer: LiveAnnouncer,
    private orderService: OrdersService,
    private snackBarService: SnackBarService
  ) {
    this.dataSource = new MatTableDataSource(this.order.orderItems)
    this.tempRoute = window.location.href
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.order.orderItems)
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  finishOrderItem(element: OrderItemExtended) {
    let statusFinished = "FINISHED";
    if (element.id)
      this.orderService.changeOrderItemStatus(element.id, statusFinished).subscribe((res) => {
        if (res.body) {
          this.snackBarService.openSnackBar(res.body)
          if (element.id) {
            const index = this.dataSource.data.indexOf(element);
            this.dataSource.data[index].status = statusFinished;
            this.dataSource._updateChangeSubscription();
          }
        }
      }, (err) => {
        this.snackBarService.openSnackBar(err.error);
      })
  }
}
