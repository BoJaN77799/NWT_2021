import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConformationDialogComponent } from 'src/modules/shared/components/conformation-dialog/conformation-dialog.component';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { Menu } from '../../models/Menu';
import { MenusService } from '../../services/menus.service';

@Component({
  selector: 'app-update-menu-dialog',
  templateUrl: './update-menu-dialog.component.html',
  styleUrls: ['./update-menu-dialog.component.scss']
})
export class UpdateMenuDialogComponent implements OnInit {

  menus: Menu[] = [];
  selected: string = '';
  nameButton: string;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateMenuDialogComponent>,
    private menusService: MenusService, private snackBarService: SnackBarService, 
    @Inject(MAT_DIALOG_DATA) public indicator: boolean) { 
      this.nameButton = (indicator) ? 'Aktivacija' : 'Deaktivacija'
    }

  ngOnInit(): void {
    this.menusService.findAllWithSpecificStatus(!this.indicator)
        .subscribe((response) => {
          this.menus = response.body as Menu[];
        },
        (err) => {
          this.snackBarService.openSnackBar("Empty list!");
        })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateMenu(): void {
    if (this.selected && this.selected !== '') {
      this.dialog.open(ConformationDialogComponent, {
        data: 
        { 
          title: "Updating menu",
          message: "You want to update menu  " + this.selected + "."
        },
      }).afterClosed().subscribe(result => {
        if (result) {
        this.menusService.updateMenu(this.selected)
        .subscribe((response) => {
          this.snackBarService.openSnackBar(response.body as string);
          this.menusService.findAllWithSpecificStatus(!this.indicator)
          .subscribe((response) => {
            this.menus = response.body as Menu[];
            this.selected = '';
          },
          (err) => {
            this.snackBarService.openSnackBar("Empty list!");
          })
        },
        (err) => {
          this.snackBarService.openSnackBar(err.error as string);
        })
        }
      });
    }
  }
}
