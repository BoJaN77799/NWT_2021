import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReportsManagerComponent } from './pages/reports-manager/reports-manager.component';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routes';

import { MaterialExampleModule } from 'src/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgChartsModule } from 'ng2-charts';

import { IncomeExpensesChartComponent } from './pages/income-expenses-chart/income-expenses-chart.component';
import { SalesChartComponent } from './pages/sales-chart/sales-chart.component';
import { SalesTableComponent } from './pages/sales-table/sales-table.component';
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
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgChartsModule,
  ],
  exports: [
    RouterModule
  ]
})
export class ReportsModule { }
