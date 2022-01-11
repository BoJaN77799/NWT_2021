import {Component} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Sales } from '../../models/sales';
import { ReportsService } from '../../services/reports.service';


@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent implements AfterViewInit{

  displayedColumns: string[] = ['itemId', 'name', 'priceCount', 'itemCount'];
 // dataSource = ELEMENT_DATA;
  // dataSource = ELEMENT_DATA;
  salesList: Sales[]  = [] ;
  dataSource = new MatTableDataSource(this.salesList);


  constructor(private _liveAnnouncer: LiveAnnouncer, private reportsService: ReportsService) {}

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.reportsService
        .getSalesTest()
        .subscribe((response) => {
          this.salesList = response.body as Sales[];
          this.dataSource = new MatTableDataSource(this.salesList);
          this.dataSource.sort = this.sort;
        });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
