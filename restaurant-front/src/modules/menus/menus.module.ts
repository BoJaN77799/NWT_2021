import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MenusManagerComponent } from './pages/menus-manager/menus-manager.component';
import { RouterModule } from '@angular/router';
import { MenusRoutes } from './menus.routes';
import { MenusBarComponent } from './components/menus-bar/menus-bar.component';
import { MenusItemsListComponent } from './components/menus-items-list/menus-items-list.component';
import { MenusItemCardComponent } from './components/menus-item-card/menus-item-card.component';

import { MaterialExampleModule } from 'src/material.module';
import { CreateMenuDialogComponent } from './components/create-menu-dialog/create-menu-dialog.component';
import { UpdateMenuDialogComponent } from './components/update-menu-dialog/update-menu-dialog.component';
import { FormsModule } from '@angular/forms';
import { MenuItemAddDialogComponent } from './components/menu-item-add-dialog/menu-item-add-dialog.component';

@NgModule({
  declarations: [
    MenusManagerComponent,
    MenusBarComponent,
    MenusItemsListComponent,
    MenusItemCardComponent,
    CreateMenuDialogComponent,
    UpdateMenuDialogComponent,
    MenuItemAddDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(MenusRoutes),
    MaterialExampleModule,
    FormsModule,
  ]
})
export class MenusModule { }
