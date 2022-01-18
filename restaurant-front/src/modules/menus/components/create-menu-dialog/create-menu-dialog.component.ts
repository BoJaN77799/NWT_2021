import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConformationDialogComponent } from 'src/modules/shared/components/conformation-dialog/conformation-dialog.component';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { Menu } from '../../models/Menu';
import { MenusService } from '../../services/menus.service';

@Component({
  selector: 'app-create-menu-dialog',
  templateUrl: './create-menu-dialog.component.html',
  styleUrls: ['./create-menu-dialog.component.scss']
})
export class CreateMenuDialogComponent implements OnInit{

  newValue: string = '';
  menus: Menu[] = [];
  
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateMenuDialogComponent>,
    private menusService: MenusService, private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.menusService.findAllWithSpecificStatus(true)
        .subscribe((response) => {
          this.menus = response.body as Menu[];
          console.log(this.menus);
        },
        (err) => {
          this.snackBarService.openSnackBar("Empty list!");
        })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createMenu(): void {
    console.log(this.newValue);
    if (this.newValue && this.newValue !== ''){
      this.dialog.open(ConformationDialogComponent, {
        data: 
        { 
          title: "Creating menu",
          message: "You want to create a new menu  " + this.newValue + "."
        },
      }).afterClosed().subscribe(result => {
        if (result) {
          this.menusService.createNewMenu(this.newValue)
          .subscribe((response) => {
            this.snackBarService.openSnackBar(response.body as string);
            this.menusService.findAllWithSpecificStatus(true)
                .subscribe((response) => {
                  this.menus = response.body as Menu[];
                },
                (err) => {
                  this.snackBarService.openSnackBar("Empty list!");
                })
          },
          (err) => {
            this.snackBarService.openSnackBar(err.error as string);
          })
        }
      })
    
    }
  }
}
