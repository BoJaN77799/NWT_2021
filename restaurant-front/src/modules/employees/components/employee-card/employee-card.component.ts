import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDTO } from '../../models/EmployeeDTO';
import { EmployeeProfileComponent } from '../employee-profile/employee-profile.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent  {

  @Input() employee: EmployeeDTO = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    telephone: '',
    adress: '',
    userType: '',
    profilePhoto: '',
    salary: 0
  };
  
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(EmployeeProfileComponent, {
      data: this.employee,
      width: '700px',
    });
  }

}
