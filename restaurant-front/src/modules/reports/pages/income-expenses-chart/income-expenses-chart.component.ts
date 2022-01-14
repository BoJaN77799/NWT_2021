import { AfterViewInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChartData, ChartType } from 'chart.js';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { IncomeExpenses } from '../../models/income-expenses';
import { ReportsService } from '../../services/reports.service';
import { SharedDatePickerService } from '../../services/shared-date-picker.service';

@Component({
  selector: 'app-income-expenses-chart',
  templateUrl: './income-expenses-chart.component.html',
  styleUrls: ['./income-expenses-chart.component.scss']
})
export class IncomeExpensesChartComponent implements AfterViewInit {
  doughnutChartLabels: string[] = [ 'Expenses', 'Income' ];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [ {data:[]} ]
  }
  doughnutChartType: ChartType = 'doughnut';

  public incomeExpenses: IncomeExpenses | undefined;

  public range = new FormGroup({});
  
  constructor(private reportsService: ReportsService, private sharedDatePickerService: SharedDatePickerService,
    private snackBarService: SnackBarService) {
    this.sharedDatePickerService.getData()
        .subscribe(res => this.range = res);
  }

  ngAfterViewInit(): void {
    this.reportsService
        .getIncomeExpensesTest()
        .subscribe((response) => {
            this.incomeExpenses = response.body as IncomeExpenses;
            this.doughnutChartData = {
              datasets: [ {data:[]} ]
            };
            this.doughnutChartData.datasets[0].data = [this.incomeExpenses.expenses, this.incomeExpenses.income];
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
          if (response.status === 200) {
            this.incomeExpenses = response.body as IncomeExpenses;
            this.doughnutChartData = {
              datasets: [ {data:[]} ]
            };
            this.doughnutChartData.datasets[0].data = [this.incomeExpenses.expenses, this.incomeExpenses.income];
          }
        },
        (err) => {
          this.snackBarService.openSnackBar('Empty list!',);
        });
  }


}
