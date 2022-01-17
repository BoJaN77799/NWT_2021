import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMenuDialogComponent } from '../create-menu-dialog/create-menu-dialog.component';

@Component({
  selector: 'app-menus-bar',
  templateUrl: './menus-bar.component.html',
  styleUrls: ['./menus-bar.component.scss']
})
export class MenusBarComponent {

  constructor(public dialog: MatDialog) { }

  openCreateMenuDialog(): void {
    this.dialog.open(CreateMenuDialogComponent);
  }
}
