import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration, ChartData } from 'chart.js';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { UserReportDTO } from '../../models/user-report-dto';
import { ReportsService } from '../../services/reports.service';
import { SharedDatePickerService } from '../../services/shared-date-picker.service';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent implements AfterViewInit {

  public range = new FormGroup({});
  
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'userType', 'ordersAccomplished'];
  activityReports : UserReportDTO[] = [];
  dataSource = new MatTableDataSource(this.activityReports);
  
  pieChartOptions: ChartConfiguration['options'] = {};
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{data:[]}]
  };
  
  constructor(private _liveAnnouncer: LiveAnnouncer,
    private reportsService: ReportsService, private sharedDatePickerService: SharedDatePickerService,
    private snackBarService: SnackBarService) { 
    this.sharedDatePickerService.getData()
      .subscribe(res => this.range = res);
  }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  
  ngAfterViewInit(): void {
    this.reportsService.getActivityTest()
        .subscribe((response) => {
          this.activityReports = response.body as UserReportDTO[];
          this.dataSource = new MatTableDataSource(this.activityReports);
          this.dataSource.sort = this.sort;
          this.fillPie();
          this.renderComponent();
        });
  }

  getActivity() {
    let dateFrom : string = this.sharedDatePickerService.checkDate(this.range.value.start);
    let dateTo : string = this.sharedDatePickerService.checkDate(this.range.value.end);

    this.reportsService.getActivity(dateFrom, dateTo)
        .subscribe((response) => {
          this.activityReports = response.body as UserReportDTO[];
          this.fillPie();
          this.renderComponent();
        },
        (err) => {
          if (err.status === 400)
            this.snackBarService.openSnackBar('Bad date format!');
          else
            this.snackBarService.openSnackBar('Empty list!');
        })

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  
  private fillPie(): void {
    this.pieChartData.labels = [];
    this.pieChartData.datasets = [{data:[]}];
    this.activityReports.forEach((value) => {
      this.pieChartData.labels?.push([value.firstName + " " + value.lastName]);
      this.pieChartData.datasets[0].data.push(value.ordersAccomplished);
    });
  }

  private renderComponent(): void {
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        datalabels: {
          formatter: (value, ctx) => {
            if (ctx.chart.data.labels) {
              return ctx.chart.data.labels[ctx.dataIndex];
            }
          },
        },
      }
    };
  }
}
