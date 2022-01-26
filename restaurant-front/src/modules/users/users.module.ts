import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { UsersSearchPageComponent } from './pages/users-search-page/users-search-page.component';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routes';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './components/user-create/user-create.component';



@NgModule({
  declarations: [
    UsersSearchPageComponent,
    UserCreateComponent
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
