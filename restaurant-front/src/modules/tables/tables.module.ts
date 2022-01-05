import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TablesRoutes } from './tables.routes';
import { RouterModule } from '@angular/router';
import { TablesAdminComponent } from './pages/tables-admin/tables-admin.component';



@NgModule({
  declarations: [
    TablesAdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(TablesRoutes)
  ]
})
export class TablesModule { }
