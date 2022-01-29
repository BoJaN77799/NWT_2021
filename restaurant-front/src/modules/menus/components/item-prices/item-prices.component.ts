import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConformationDialogComponent } from 'src/modules/shared/components/conformation-dialog/conformation-dialog.component';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { ItemMenuDTO } from '../../models/ItemMenuDTO';
import { ItemPriceDTO } from '../../models/ItemPriceDTO';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-item-prices',
  templateUrl: './item-prices.component.html',
  styleUrls: ['./item-prices.component.scss']
})
export class ItemPricesComponent implements OnInit {

  title: string;
  header: string;
  label: string;
  content: string [] = [];

  value: number;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ItemPricesComponent>,
    @Inject(MAT_DIALOG_DATA) public item: ItemMenuDTO,
    private itemsService: ItemsService, private snackBarService: SnackBarService) { 
      this.value = 0;
      this.title = item.name;
      this.header = "Create a new price for selected item.";
      this.label = "New price"
    }

  ngOnInit(): void {
    this.itemsService.getPricesOfItem(this.item.id.toString())
        .subscribe((response) => {
            this.content = this.itemsService.convertPricesToContent(response.body as ItemPriceDTO[]);
        },
        (err) => {
          if (err.status === 404) {
            this.snackBarService.openSnackBar("List of prices is empty!");
          }
          else if (err.status === 400) {
            this.snackBarService.openSnackBar("Invalid user!");
          }
        })
  }

  createNewPrice(): void {
    if (this.value) {
      let newItemPrice = {id: this.item.id, newPrice: this.value};
      this.dialog.open(ConformationDialogComponent, {
        data: 
        { 
          title: "Creating a new price",
          message: "You want to create a price  " + this.value + " RSD."
        },
      }).afterClosed().subscribe(result => {
        if (result) {
          this.itemsService.createUpdatePriceOnItem(newItemPrice as ItemPriceDTO)
          .subscribe((response) => {
            this.snackBarService.openSnackBar(response.body as string);
            this.itemsService.getPricesOfItem(this.item.id.toString())
            .subscribe((newResponse) => {
              this.content = this.itemsService.convertPricesToContent(newResponse.body as ItemPriceDTO[]);
              this.item.currentPrice = this.value; // podesimo novu cijenu za artikal
            })
          }, 
          (err) => {
            this.snackBarService.openSnackBar(err.error as string);
          });
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
