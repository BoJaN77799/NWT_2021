import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../../models/order';
import { OrderItem, OrderItemWithItem } from '../../models/order-item';
import { OrdersPageComponent } from '../../pages/orders-page/orders-page.component';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements AfterViewInit {

  displayedColumns: string[] = ['itemType', 'name', 'price', 'quantity', 'priority'];
  dataSource: MatTableDataSource<OrderItemWithItem>;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<OrdersPageComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order, private _liveAnnouncer: LiveAnnouncer,
  ) {
    this.dataSource = new MatTableDataSource(this.order.orderItems)
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
}
