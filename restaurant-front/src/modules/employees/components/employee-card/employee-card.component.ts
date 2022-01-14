import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDTO } from '../../models/EmployeeDTO';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {

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
  
  constructor() { }

  ngOnInit(): void {
    console.log('');
  }

}
