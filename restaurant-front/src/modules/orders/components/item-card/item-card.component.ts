import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { Item } from '../../../shared/models/item';
import { AddNewItemService } from '../../services/add-new-item.service';
import { NumberDialogComponent } from '../number-dialog/number-dialog.component';
import { AddNewItem } from '../../models/add-new-item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input()
  item: Item;

  constructor(public dialog: MatDialog, private snackBarService : SnackBarService,
              private addNewItemService : AddNewItemService) {
    this.item = { id: -1,  name: '', description: '', price: -1, category: {id: -1, name: ''}, imgSrc: '', itemType: ''};
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NumberDialogComponent, {
      width: '250px',
      data: { name: this.item.name, id: this.item.id, quantity: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined) return;
      
      if(result === null) 
        this.snackBarService.openSnackBarFast('Invalid quantity');
      else if(result < 1) {
        this.snackBarService.openSnackBarFast('Invalid quantity');
      }
      else {
        let newItem : AddNewItem = { id: this.item.id, name: this.item.name, quantity: result, price: this.item.price, itemType: this.item.itemType };
        this.sendNewItem(newItem);
      }
    });
  }

  sendNewItem(newItem: AddNewItem) : void {
    this.addNewItemService.sendItem(newItem);
  }
}
