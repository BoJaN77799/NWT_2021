import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TablesRoutes } from './tables.routes';
import { RouterModule } from '@angular/router';
import { TablesAdminComponent } from './pages/tables-admin/tables-admin.component';
import { DroppableDirective } from './directives/droppable/droppable.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TablesWaiterComponent } from './pages/tables-waiter/tables-waiter.component';



@NgModule({
  declarations: [
    TablesAdminComponent,
    DroppableDirective,
    TablesWaiterComponent
  ],
  imports: [
    DragDropModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(TablesRoutes)
  ]
})
export class TablesModule { }
