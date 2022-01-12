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
import { PaginationComponent } from './components/pagination/pagination.component';
import { UtilService } from './services/util/util.service';

@NgModule({
  declarations: [
    DateRangePickerComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    DateRangePickerComponent,
    PaginationComponent
  ],
  providers: [
    UtilService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
})
export class SharedModule { }
