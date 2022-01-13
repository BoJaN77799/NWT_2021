import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from '../auth/auth.module';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RootLayoutPageComponent } from './pages/root-layout-page/root-layout-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TablesModule } from '../tables/tables.module';
import { HeaderCommonComponent } from './components/headers/header-common/header-common.component';
import { HeaderManagerComponent } from './components/headers/header-manager/header-manager.component';
import { MatRippleModule } from '@angular/material/core';
import { ReportsModule } from '../reports/reports.module';
import { OrdersModule } from '../orders/orders.module';
import { HeaderCookComponent } from './components/headers/header-cook/header-cook.component';
import { ItemsModule } from '../items/items.module';

@NgModule({
  declarations: [
    AppComponent,
    RootLayoutPageComponent,
    HeaderCommonComponent,
    HeaderManagerComponent,
    HeaderCookComponent,
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
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule, 
    TablesModule,
    ReportsModule,
    OrdersModule,
    ItemsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
