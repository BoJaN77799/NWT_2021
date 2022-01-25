import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderViewComponent } from '../../components/order-view/order-view.component';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'createdAt', 'note', 'tableId'];

  pageSize: number;
  currentPage: number;
  totalSize: number;
  ordersList: Order[];
  dataSource: MatTableDataSource<Order>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private ordersService: OrdersService, public dialog: MatDialog) {
    this.ordersList = [];
    this.dataSource = new MatTableDataSource(this.ordersList)
    this.pageSize = 5;
    this.currentPage = 1;
    this.totalSize = 1;
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.ordersService
      .getAll(this.currentPage - 1, this.pageSize)
      .subscribe((res) => {
        if (res.body) {
          this.ordersList = res.body as Order[];
          this.dataSource = new MatTableDataSource(this.ordersList);
          this.dataSource.sort = this.sort;
          this.totalSize = Number(res.headers.get("total-elements"));
        }
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  changePage(newPage: number) {
    this.ordersService.getAll(newPage - 1, this.pageSize).subscribe((res) => {
      this.ordersList = res.body as Order[];
      this.dataSource = new MatTableDataSource(this.ordersList);
      this.dataSource.sort = this.sort;
      this.totalSize = Number(res.headers.get("total-elements"));
    });
  }

  openDialog(row: any): void {
    console.log(row);

    const dialogRef = this.dialog.open(OrderViewComponent, {
      data: row,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
