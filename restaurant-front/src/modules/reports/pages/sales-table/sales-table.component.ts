import {Component, Input} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Sales } from '../../models/sales';
import { ReportsService } from '../../services/reports.service';
import { FormGroup } from '@angular/forms';
import { SharedDatePickerService } from '../../services/shared-date-picker.service';
import { ChartData } from 'chart.js';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';


@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent implements AfterViewInit{

  displayedColumns: string[] = ['itemId', 'name', 'priceCount', 'itemCount'];
  salesList: Sales[]  = [] ;
  dataSource = new MatTableDataSource(this.salesList);

  doughnutChartLabels: string[] =  [];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
    ]
  }

  public range = new FormGroup({});
  
  constructor(private _liveAnnouncer: LiveAnnouncer, private reportsService: ReportsService,
    private sharedDatePickerService: SharedDatePickerService, private snackBarService: SnackBarService) {
    this.sharedDatePickerService.getData()
      .subscribe(res => this.range = res);
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.reportsService
        .getSalesTest()
        .subscribe((response) => {
          this.salesList = response.body as Sales[];
          this.dataSource = new MatTableDataSource(this.salesList);
          this.dataSource.sort = this.sort;
          this.fillDoughnut();
        });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getSales() {
    let dateFrom : string = this.sharedDatePickerService.checkDate(this.range.value.start);
    let dateTo : string = this.sharedDatePickerService.checkDate(this.range.value.end);
 
    this.reportsService
        .getSales(dateFrom, dateTo)
        .subscribe((response) => {
            this.salesList = response.body as Sales[];
            this.dataSource = new MatTableDataSource(this.salesList);
            this.dataSource.sort = this.sort;
            this.fillDoughnut();
        },
        (err) => {
          this.snackBarService.openSnackBar('Empty list!');
        })
        ;
  }

  private fillDoughnut() : void {
    this.doughnutChartLabels = [];
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [ {data:[]}, {data:[]}]
    };
    this.salesList.forEach(value => {
      this.doughnutChartData.datasets[0].data.push(value.priceCount);
      this.doughnutChartData.datasets[1].data.push(value.itemCount);
      this.doughnutChartLabels.push(value.name);
    })
  }
}
