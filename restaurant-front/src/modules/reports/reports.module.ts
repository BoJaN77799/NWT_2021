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
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSortModule} from '@angular/material/sort';

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
    MatIconModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatSortModule
  ],
  exports: [
    RouterModule
  ]
})
export class ReportsModule { }