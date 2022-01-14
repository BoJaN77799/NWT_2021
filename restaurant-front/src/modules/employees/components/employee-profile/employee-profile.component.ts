import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDTO } from '../../models/EmployeeDTO';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent{

  constructor(
    public dialogRef: MatDialogRef<EmployeeProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: EmployeeDTO,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
