import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { UsersSearchPageComponent } from './pages/users-search-page/users-search-page.component';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routes';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserViewInfoComponent } from './components/user-view-info/user-view-info.component';



@NgModule({
  declarations: [
    UsersSearchPageComponent,
    UserViewInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(UsersRoutes),
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
