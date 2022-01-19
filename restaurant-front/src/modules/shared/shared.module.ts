import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackBarService } from './services/snack-bar.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UtilService } from './services/util/util.service';
import { SearchInputBtnComponent } from './components/search-input-btn/search-input-btn.component';
import { SelectCustomTextComponent } from './components/select-custom-text/select-custom-text.component';
import { FoodSearchService } from './services/food-search.service';
import { DrinkSearchService } from './services/drink-search.service';
import { ConformationDialogComponent } from './components/conformation-dialog/conformation-dialog.component';
import { MenuNamesService } from './services/menu-names.service';

@NgModule({
  declarations: [
    PaginationComponent,
    ConformationDialogComponent,
    PaginationComponent,
    SearchInputBtnComponent,
    SelectCustomTextComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ],
  exports: [
    PaginationComponent,
    SearchInputBtnComponent,
    SelectCustomTextComponent,
  ],
  providers: [
    SnackBarService,
    UtilService,
    FoodSearchService,
    DrinkSearchService,
    MenuNamesService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
})
export class SharedModule { }
