import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChartConfiguration, ChartData } from 'chart.js';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { Sales } from '../../models/sales';
import { ReportsService } from '../../services/reports.service';
import { SharedDatePickerService } from '../../services/shared-date-picker.service';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent implements AfterViewInit {
  
  public range = new FormGroup({});
  
  barChartData: ChartData<'bar'> = {
    datasets: [] 
  };
  salesList: Sales[]  = [] ;
  
  barChartOptions: ChartConfiguration['options'] = {};
  
  constructor(private reportsService: ReportsService, private sharedDatePickerService: SharedDatePickerService,
    private snackBarService: SnackBarService) { 
    this.sharedDatePickerService.getData()
      .subscribe(res => this.range = res);
  }

  ngAfterViewInit(): void {
    this.reportsService.getSalesTest()
        .subscribe(response => {
          this.salesList = response.body as Sales[];
          this.fillBar();
          this.renderComponent();
          console.log(this.salesList);
        });
  }

  getSales() {
    let dateFrom : string = this.sharedDatePickerService.checkDate(this.range.value.start);
    let dateTo : string = this.sharedDatePickerService.checkDate(this.range.value.end);

    this.reportsService.getSales(dateFrom, dateTo)
        .subscribe((response) => {
          this.salesList = response.body as Sales[];
          this.fillBar();
          this.renderComponent();
          console.log(this.salesList);
        },
        (err) => {
          if (err.status === 400)
            this.snackBarService.openSnackBar('Bad date format!');
          else
            this.snackBarService.openSnackBar('Empty list!');
        });

  }

  private fillBar(): void {
    this.barChartData.datasets = [];
    this.barChartData.labels = [];
    
    for (let i = 0; i < this.salesList.length; i++ ) {
      this.barChartData.datasets.push({data:[]});
      const map = new Map(Object.entries(this.salesList[i].salesPerMonth));
      for (let [key, value] of map) {
        if (i === 0) {
          this.barChartData.labels.push(key);
        }
        this.barChartData.datasets[i].data.push(value.priceCount);
      } 
      this.barChartData.datasets[i].label = this.salesList[i].name;
    }
  }

  private renderComponent(): void {
    this.barChartOptions = {
      responsive: true,
      scales: {
        x: {},
        y: {
          min: 10
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
