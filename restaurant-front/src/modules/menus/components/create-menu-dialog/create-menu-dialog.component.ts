import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { MenusService } from '../../services/menus.service';

@Component({
  selector: 'app-create-menu-dialog',
  templateUrl: './create-menu-dialog.component.html',
  styleUrls: ['./create-menu-dialog.component.scss']
})
export class CreateMenuDialogComponent {

  newValue: string = '';
  
  constructor(
    public dialogRef: MatDialogRef<CreateMenuDialogComponent>,
    private menusService: MenusService, private snackBarService: SnackBarService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createMenu(): void {
    console.log(this.newValue);
    if (this.newValue && this.newValue !== ''){
      this.menusService.createNewMenu(this.newValue)
          .subscribe((response) => {
            this.snackBarService.openSnackBar(response.body as string);
          },
          (err) => {
            this.snackBarService.openSnackBar(err.error as string);
          })
    }
  }
}
