import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptors/interceptor.interceptor';

import { MaterialExampleModule } from 'src/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SnackBarService } from './services/snack-bar.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UtilService } from './services/util/util.service';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ],
  exports: [
    PaginationComponent
  ],
  providers: [
    SnackBarService,
    UtilService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
})
export class SharedModule { }
