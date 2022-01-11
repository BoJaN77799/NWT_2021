import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartData, ChartType } from 'chart.js';
import { IncomeExpenses } from '../../models/income-expenses';
import { ReportsService } from '../../services/reports.service';
import { SharedDatePickerService } from '../../services/shared-date-picker.service';

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

  public range = new FormGroup({});
  
  constructor(private reportsService: ReportsService, private sharedDatePickerService: SharedDatePickerService) {
    this.sharedDatePickerService.getData()
        .subscribe(res => this.range = res);
  }

  ngAfterViewInit(): void {
    this.reportsService
        .getIncomeExpensesTest()
        .subscribe((response) => {
            this.incomeExpenses = response.body as IncomeExpenses;
            this.doughnutChartData = {
              labels: this.doughnutChartLabels,
              datasets: [
                { data: [ this.incomeExpenses.expenses, this.incomeExpenses.income ] },
              ]
            };
        });
  }

  public getIncomeExpenses() {
    let dateFrom : string = this.sharedDatePickerService.checkDate(this.range.value.start);
    let dateTo : string = this.sharedDatePickerService.checkDate(this.range.value.end);
    console.log(this.sharedDatePickerService.checkDate(this.range.value.start));
    console.log(this.sharedDatePickerService.checkDate(this.range.value.end));
  
    this.reportsService
        .getIncomeExspenses(dateFrom, dateTo)
        .subscribe((response) => {
          this.incomeExpenses = response.body as IncomeExpenses;
          this.doughnutChartData = {
            labels: this.doughnutChartLabels,
            datasets: [
              { data: [ this.incomeExpenses.expenses, this.incomeExpenses.income ] },
            ]
          };
        });
  }
}
