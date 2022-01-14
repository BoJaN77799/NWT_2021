import { AfterViewInit, Component } from '@angular/core';
import { EmployeeDTO } from '../../models/EmployeeDTO';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.scss']
})
export class EmployeesViewComponent implements AfterViewInit {

  pageSize: number;
  currentPage: number;
  totalSize: number;
  employees: EmployeeDTO [];

  constructor(private employeesService: EmployeesService) { 
    this.employees = [];
    this.pageSize = 3;
    this.currentPage = 1;
    this.totalSize = 1;
  }

  ngAfterViewInit(): void {
    this.employeesService.findAllEmployees(this.currentPage - 1, this.pageSize)
        .subscribe((response) => {
          this.employees = response.body as EmployeeDTO[];
          this.totalSize = Number(response.headers.get("total-elements"));
          console.log(this.employees);
        });
  }

  changePage(newPage: number) {
    this.employeesService.findAllEmployees(newPage - 1, this.pageSize)
        .subscribe((response) => {
          this.employees = response.body as EmployeeDTO[];
          this.totalSize = Number(response.headers.get("total-elements"));
          console.log(this.employees);
        });
  }

}
