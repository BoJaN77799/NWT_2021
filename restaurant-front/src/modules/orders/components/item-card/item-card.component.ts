import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { Item } from '../../models/item';
import { NumberDialogComponent } from '../number-dialog/number-dialog.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() 
  item: Item | undefined;

  constructor(public dialog: MatDialog, private snackBarService : SnackBarService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NumberDialogComponent, {
      width: '250px',
      data: { name: this.item?.name, id: this.item?.id, quantity: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result < 0) {
        this.snackBarService.openSnackBar('Invalid quantity');
      }
      else {
        // emit
      }
    });
  }

  ngOnInit(): void {
  }

}
