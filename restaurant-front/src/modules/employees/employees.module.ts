import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EmployeesRoutes } from './employees.routes';

import { MaterialExampleModule } from 'src/material.module';

import { EmployeesViewComponent } from './pages/employees-view/employees-view.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoneyViewComponent } from './components/money-view/money-view.component';

@NgModule({
  declarations: [
    EmployeesViewComponent,
    EmployeeCardComponent,
    EmployeeProfileComponent,
    MoneyViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(EmployeesRoutes),
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmployeesModule { }
