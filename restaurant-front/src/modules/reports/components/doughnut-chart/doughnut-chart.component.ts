import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: [ './doughnut-chart.component.scss' ]
})
export class DoughnutChartComponent {
  @Input() doughnutChartLabels: string[] =  [];
  @Input() doughnutChartData: ChartData<'doughnut'> | undefined;
  public doughnutChartType: ChartType = 'doughnut';
}
