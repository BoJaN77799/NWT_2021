import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReportsManagerComponent } from './pages/reports-manager/reports-manager.component';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SalesTableComponent } from './pages/sales-table/sales-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';
import { IncomeExpensesChartComponent } from './pages/income-expenses-chart/income-expenses-chart.component';

import { NgChartsModule } from 'ng2-charts';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SalesChartComponent } from './pages/sales-chart/sales-chart.component';
import { ActivityTableComponent } from './pages/activity-table/activity-table.component';
import { ActivityChartComponent } from './pages/activity-chart/activity-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';



@NgModule({
  declarations: [
    ReportsManagerComponent,
    SalesTableComponent,
    IncomeExpensesChartComponent,
    SalesChartComponent,
    ActivityTableComponent,
    ActivityChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ReportsRoutes),
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatSortModule,
    NgChartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
   
  ],
  exports: [
    RouterModule
  ]
})
export class ReportsModule { }
