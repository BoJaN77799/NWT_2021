import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { UtilService } from 'src/modules/shared/services/util/util.service';
import { OrderViewComponent } from '../../components/order-view/order-view.component';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-my-orders-page',
  templateUrl: './my-orders-page.component.html',
  styleUrls: ['./my-orders-page.component.scss']
})
export class MyOrdersPageComponent implements AfterViewInit {

  employeeId: number;

  displayedColumns: string[] = ['id', 'createdAt', 'note', 'tableId', 'button'];

  pageSize: number;
  currentPage: number;
  totalSize: number;
  ordersList: Order[];
  dataSource: MatTableDataSource<Order>;

  constructor(private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private ordersService: OrdersService,
    public dialog: MatDialog
  ) {
    this.employeeId = 0;
    this.ordersList = [];
    this.dataSource = new MatTableDataSource(this.ordersList)
    this.pageSize = 5;
    this.currentPage = 1;
    this.totalSize = 1;
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.dataSource.sort = this.sort;
    this.ordersService
      .getAllMy(this.employeeId, this.currentPage - 1, this.pageSize)
      .subscribe((res) => {
        if (res.body) {
          console.log(res);

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
    this.ordersService.getAllMy(this.employeeId, newPage - 1, this.pageSize).subscribe((res) => {
      this.ordersList = res.body as Order[];
      this.dataSource = new MatTableDataSource(this.ordersList);
      this.dataSource.sort = this.sort;
      this.totalSize = Number(res.headers.get("total-elements"));
    });
  }

  openInfoDialog(row: any): void {
    this.ordersService.getOneWitOrderItems(row.id).subscribe((res) => {
      const dialogRef = this.dialog.open(OrderViewComponent, {
        data: res.body,
        width: '60%',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    })
  }


}