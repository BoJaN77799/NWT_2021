import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCreatePageComponent } from './pages/item-create-page/item-create-page.component';
import { FoodCreateComponent } from './components/food-create/food-create.component';
import { DrinkCreateComponent } from './components/drink-create/drink-create.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ItemsRoutes } from './items.routes';
import { ItemCreateComponent } from './components/item-create/item-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    ItemCreatePageComponent,
    FoodCreateComponent,
    DrinkCreateComponent,
    ItemCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ItemsRoutes),
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class ItemsModule { }
