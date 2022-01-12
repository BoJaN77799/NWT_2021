import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChartData } from 'chart.js';
import { Sales } from '../../models/sales';
import { ReportsService } from '../../services/reports.service';
import { SharedDatePickerService } from '../../services/shared-date-picker.service';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent implements OnInit {
  
  barChartData: ChartData<'bar'> = {
    datasets: [] 
  };
  salesList: Sales[]  = [] ;
  
  public range = new FormGroup({});
  
  constructor(private reportsService: ReportsService, private sharedDatePickerService: SharedDatePickerService) { 
    this.sharedDatePickerService.getData()
      .subscribe(res => this.range = res);
  }

  ngOnInit(): void {
    this.reportsService.getSalesTest()
        .subscribe(response => {
          this.salesList = response.body as Sales[];
          this.fillBar()
        });
  }

  private fillBar(): void {
    if (this.salesList.length  === 0) {
      return;
    }

    this.barChartData.datasets = [];
    this.barChartData.labels = [];
    
    for (let i = 0; i < this.salesList.length; i++ ) {
      this.barChartData.datasets.push({data:[]});
      let counter = 0;
      
      for (const [key, value] of this.salesList[i].salesPerMonth.entries()) {
        console.log(key, value);
        if (i === 0) {
          this.barChartData.labels.push(key);
        }
        this.barChartData.datasets[counter].data.push(value.priceCount);
        ++counter;
      }
    
      
    }
    
    

  }
}
