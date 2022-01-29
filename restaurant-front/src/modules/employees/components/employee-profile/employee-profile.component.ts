import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDTO } from '../../models/EmployeeDTO';
import { MoneyViewComponent } from '../money-view/money-view.component';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent{

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<EmployeeProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: EmployeeDTO,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openMoneyDialog(indicator: boolean): void {
    this.dialog.open(MoneyViewComponent, {
      data: {indicator : indicator, employee: this.employee},
    });
  }

}
