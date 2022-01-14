import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { QuantitySelection } from '../../models/QuantitySelection';

@Component({
  selector: 'app-number-dialog',
  templateUrl: './number-dialog.component.html',
  styleUrls: ['./number-dialog.component.scss']
})
export class NumberDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NumberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public quantitySelection: QuantitySelection,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

}
