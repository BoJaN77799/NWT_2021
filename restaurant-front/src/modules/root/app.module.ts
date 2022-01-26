import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from '../auth/auth.module';

import { HttpClientModule } from '@angular/common/http';

import { MaterialExampleModule } from 'src/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RootLayoutPageComponent } from './pages/root-layout-page/root-layout-page.component';
import { TablesModule } from '../tables/tables.module';
import { HeaderCommonComponent } from './components/headers/header-common/header-common.component';
import { HeaderManagerComponent } from './components/headers/header-manager/header-manager.component';

import { ReportsModule } from '../reports/reports.module';
import { OrdersModule } from '../orders/orders.module';
import { HeaderCookComponent } from './components/headers/header-cook/header-cook.component';

import { NgChartsModule } from 'ng2-charts';

import { EmployeesModule } from '../employees/employees.module';
import { HeaderAdminComponent } from './components/headers/header-admin/header-admin/header-admin.component';
import { UsersModule } from '../users/users.module';
import { ProfileViewComponent } from './components/common/profile-view/profile-view.component';

@NgModule({
  declarations: [
    AppComponent,
    RootLayoutPageComponent,
    HeaderCommonComponent,
    HeaderManagerComponent,
    HeaderCookComponent,
    HeaderAdminComponent,
    ProfileViewComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MaterialExampleModule,
    TablesModule,
    ReactiveFormsModule,
    ReportsModule,
    NgChartsModule,
    OrdersModule,
    EmployeesModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
