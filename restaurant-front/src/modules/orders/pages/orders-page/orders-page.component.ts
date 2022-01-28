import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationType } from 'src/modules/shared/models/enums/notification-type';
import { NotificationWithType } from 'src/modules/shared/models/notification';
import { NotificationService } from 'src/modules/shared/services/notification.service';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { UtilService } from 'src/modules/shared/services/util/util.service';
import { OrderViewComponent } from '../../components/order-view/order-view.component';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'createdAt', 'note', 'tableId', 'orderSize', 'button'];

  pageSize: number;
  currentPage: number;
  totalSize: number;
  ordersList: Order[];
  dataSource: MatTableDataSource<Order>;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private ordersService: OrdersService,
    public dialog: MatDialog,
    private utilService: UtilService,
    private snackBarService: SnackBarService,
    private notificationService: NotificationService
  ) {
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
    this.notificationService.notificationMessage$.subscribe((notification) => {
      if (notification.type === NotificationType.CREATE_ORDER) {
        this.ordersService
          .getAll(this.currentPage, this.pageSize)
          .subscribe((res) => {
            if (res.body) {
              this.ordersList = res.body as Order[]; // refreshing content on current page when notification occured
              this.dataSource = new MatTableDataSource(this.ordersList);
              this.dataSource.sort = this.sort;
              this.totalSize = Number(res.headers.get("total-elements"));
            }
          });
      }
    })
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
    const dialogRef = this.dialog.open(OrderViewComponent, {
      data: row,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  acceptOrder(element: any): void {
    console.log(element);
    let email = this.utilService.getLoggedUserEmail();
    if (email) this.ordersService.acceptOrder(element.id, email).subscribe((res) => {
      if (res.status == 200) {
        if (res.body) {
          this.snackBarService.openSnackBar(res.body as string);
        }
        const index = this.dataSource.data.indexOf(element.id);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
      else {
        this.snackBarService.openSnackBar(res.body as string);
      }
    });
  }

}
