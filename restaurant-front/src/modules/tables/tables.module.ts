import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TablesRoutes } from './tables.routes';
import { RouterModule } from '@angular/router';
import { TablesAdminComponent } from './pages/tables-admin/tables-admin.component';
import { DraggableDirective } from './directives/draggable/draggable.directive';
import { DroppableDirective } from './directives/droppable/droppable.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    TablesAdminComponent,
    DraggableDirective,
    DroppableDirective
  ],
  imports: [
    DragDropModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(TablesRoutes)
  ]
})
export class TablesModule { }
