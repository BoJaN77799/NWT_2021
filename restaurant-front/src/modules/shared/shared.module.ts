import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from './services/snack-bar.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UtilService } from './services/util/util.service';
import { SearchInputBtnComponent } from './components/search-input-btn/search-input-btn.component';
import { SelectCustomTextComponent } from './components/select-custom-text/select-custom-text.component';
import { MatSelectModule } from '@angular/material/select';
import { FoodSearchService } from './services/food-search.service';
import { DrinkSearchService } from './services/drink-search.service';

@NgModule({
  declarations: [
    DateRangePickerComponent,
    PaginationComponent,
    SearchInputBtnComponent,
    SelectCustomTextComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    DateRangePickerComponent,
    PaginationComponent,
    SearchInputBtnComponent,
    SelectCustomTextComponent,
  ],
  providers: [
    SnackBarService,
    UtilService,
    FoodSearchService,
    DrinkSearchService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
})
export class SharedModule { }
