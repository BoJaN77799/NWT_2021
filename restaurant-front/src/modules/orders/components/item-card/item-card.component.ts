import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { AddNewItem } from '../../models/add-new-item';
import { Item } from '../../models/item';
import { AddNewItemService } from '../../services/add-new-item.service';
import { NumberDialogComponent } from '../number-dialog/number-dialog.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() 
  item: Item | undefined;

  constructor(public dialog: MatDialog, private snackBarService : SnackBarService,
              private addNewItemService : AddNewItemService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NumberDialogComponent, {
      width: '250px',
      data: { name: this.item?.name, id: this.item?.id, quantity: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result < 0) {
        this.snackBarService.openSnackBarFast('Invalid quantity', );
      }
      else {
        let newItem : AddNewItem = { id: this.item?.id, quantity: result };
        this.sendNewItem(newItem);
      }
    });
  }

  sendNewItem(newItem: AddNewItem) : void {
    this.addNewItemService.sendItem(newItem);
  }

  ngOnInit(): void {
  }

}
