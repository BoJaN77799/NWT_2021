import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConformationDialogComponent } from 'src/modules/shared/components/conformation-dialog/conformation-dialog.component';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { ItemMenuDTO } from '../../models/ItemMenuDTO';
import { MenuItemDTO } from '../../models/MenuItemDTO';
import { MenusService } from '../../services/menus.service';
import { MenuItemAddDialogComponent } from '../menu-item-add-dialog/menu-item-add-dialog.component';


@Component({
  selector: 'app-menus-item-card',
  templateUrl: './menus-item-card.component.html',
  styleUrls: ['./menus-item-card.component.scss']
})
export class MenusItemCardComponent {

  @Input() item: ItemMenuDTO = {
    id: 0,
    name: '',
    description: '',
    image: '',
    cost: 0,
    currentPrice: 0,
    itemType: '',
    menu: ''
  }

  @Input() selectedName: string = '';
  
  @Output() renderList: EventEmitter<any> = new EventEmitter();
  
  constructor(public dialog: MatDialog, private menusService: MenusService, private snackBarService: SnackBarService) { }

  addItemToMenu(): void {
    let menuItemDTO =  {menuName: '', itemId: this.item.id};
    this.dialog.open(MenuItemAddDialogComponent, {
      data: menuItemDTO
    }).afterClosed().subscribe(result => {
      if (result) {
        this.menusService.addItemToMenu(menuItemDTO as MenuItemDTO)
        .subscribe((response) => {
          this.snackBarService.openSnackBar(response.body as string);
          this.renderList.emit(null);
        },
        (err) => {
          this.snackBarService.openSnackBar(err.error as string);
        })
      }
    })
  }

  removeItemFromMenu(): void {
    this.dialog.open(ConformationDialogComponent, {
      data: 
      { 
        title: "Remove item from menu",
        message: "You want to remove " + this.item.name + " from " + this.item.menu + "."
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.menusService.removeItemFromMenu({menuName: this.item.menu, itemId: this.item.id})
        .subscribe((response) => {
          console.log(response);
          this.snackBarService.openSnackBar(response.body as string);
          this.renderList.emit(null);
        },
        (err) => {
          this.snackBarService.openSnackBar(err.error as string);
        })
      }
    })
  }

}
