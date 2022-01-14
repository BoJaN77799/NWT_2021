import { AfterViewInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChartConfiguration, ChartData } from 'chart.js';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { UserReportDTO } from '../../models/user-report-dto';
import { ReportsService } from '../../services/reports.service';
import { SharedDatePickerService } from '../../services/shared-date-picker.service';

@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.scss']
})
export class ActivityChartComponent implements AfterViewInit {

  barChartData: ChartData<'bar'> = {
    datasets: [] 
  };
  activityReports : UserReportDTO[] = [];

  barChartOptions: ChartConfiguration['options'] = {};
  
  public range = new FormGroup({});
  
  constructor(private reportsService: ReportsService, private sharedDatePickerService: SharedDatePickerService,
    private snackBarService: SnackBarService) { 
    this.sharedDatePickerService.getData()
      .subscribe(res => this.range = res);
  }


  ngAfterViewInit(): void {
    this.reportsService.getActivityTest()
        .subscribe((response) => {
          this.activityReports = response.body as UserReportDTO[];
          console.log(this.activityReports);
          this.fillBar();
          this.renderComponent();
        });
  }

  getAcivity() {
    let dateFrom : string = this.sharedDatePickerService.checkDate(this.range.value.start);
    let dateTo : string = this.sharedDatePickerService.checkDate(this.range.value.end);

    this.reportsService.getActivity(dateFrom, dateTo)
        .subscribe((response) => {
          this.activityReports = response.body as UserReportDTO[];
          this.fillBar();
          this.renderComponent();
        },
        (err) => {
          this.snackBarService.openSnackBar('Empty list!');
        });

  }

  private fillBar(): void {
    this.barChartData.datasets = [];
    this.barChartData.labels = [];

    for (let i = 0; i < this.activityReports.length; i++) {
      this.barChartData.datasets.push({data:[]});
      const map = new Map(Object.entries(this.activityReports[i].ordersPerMonth));
      for (let [key, value] of map) {
        if (i == 0) {
          this.barChartData.labels.push(key);
        }
        this.barChartData.datasets[i].data.push(value)
      }
      this.barChartData.datasets[i].label = this.activityReports[i].firstName + " " + this.activityReports[i].lastName;
    }
  }

  private renderComponent(): void {
    this.barChartOptions = {
      responsive: true,
      scales: {
        x: {},
        y: {
          min: 0
        }
      },
      plugins: {
        legend: {
          display: true,
        },
        datalabels: {
          anchor: 'end',
          align: 'end'
        }
      }
    }
  }

}
