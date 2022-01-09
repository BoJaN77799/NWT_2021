import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReportsManagerComponent } from './pages/reports-manager/reports-manager.component';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routes';

import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SalesTableComponent } from './pages/sales-table/sales-table.component';

@NgModule({
  declarations: [
    ReportsManagerComponent,
    SalesTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ReportsRoutes),
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule
  ],
  exports: [
    RouterModule
  ]
})
export class ReportsModule { }
