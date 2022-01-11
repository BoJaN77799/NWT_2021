import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { IncomeExpenses } from '../../models/income-expenses';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-income-expenses-chart',
  templateUrl: './income-expenses-chart.component.html',
  styleUrls: ['./income-expenses-chart.component.scss']
})
export class IncomeExpensesChartComponent implements AfterViewInit {
  private doughnutChartLabels: string[] = [ 'Expenses', 'Income' ];
  public doughnutChartData: ChartData<'doughnut'> | undefined;
  public doughnutChartType: ChartType = 'doughnut';
  public incomeExpenses: IncomeExpenses | undefined;

  constructor(private reportsService: ReportsService) {}

  ngAfterViewInit(): void {
    this.reportsService
        .getIncomeExpenses()
        .subscribe((response) => {
            this.incomeExpenses = response.body as IncomeExpenses;
            console.log(this.incomeExpenses);
            this.doughnutChartData = {
              labels: this.doughnutChartLabels,
              datasets: [
                { data: [ this.incomeExpenses.expenses, this.incomeExpenses.income ] },
              ]
            };
        });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  

}
