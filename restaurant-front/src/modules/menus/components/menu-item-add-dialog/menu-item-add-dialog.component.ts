import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConformationDialogComponent } from 'src/modules/shared/components/conformation-dialog/conformation-dialog.component';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { Menu } from '../../models/Menu';
import { MenuItemDTO } from '../../models/MenuItemDTO';
import { MenusService } from '../../services/menus.service';

@Component({
  selector: 'app-menu-item-add-dialog',
  templateUrl: './menu-item-add-dialog.component.html',
  styleUrls: ['./menu-item-add-dialog.component.scss']
})
export class MenuItemAddDialogComponent implements OnInit{

  menus: Menu[] = [];

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<MenuItemAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public menuItemDTO: MenuItemDTO, private menusService: MenusService, 
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.menusService.findAllWithSpecificStatus(true)
        .subscribe((response) => {
          this.menus = response.body as Menu[];
        },
        (err) => {
          this.snackBarService.openSnackBar("Empty list!");
        })
  }

  check(): void {
    if (this.menuItemDTO.menuName && this.menuItemDTO.menuName !== '') {
      this.dialog.open(ConformationDialogComponent, {
        data: 
        { 
          title: "Add item to menu",
          message: "You want to add " + this.menuItemDTO.itemId + " to " + this.menuItemDTO.menuName + "."
        },
      }).afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close(true);
        }
      })
    }
  }
}
