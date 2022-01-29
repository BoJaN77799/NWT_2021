import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginationComponent } from 'src/modules/shared/components/pagination/pagination.component';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { SocketService } from 'src/modules/shared/services/socket.service';
import { EmployeeDTO } from '../../models/EmployeeDTO';
import { EmployeesService } from '../../services/employees.service';


@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.scss']
})
export class EmployeesViewComponent implements AfterViewInit {

  @ViewChild(PaginationComponent) pagination?: PaginationComponent;
  pageSize: number;
  currentPage: number;
  totalSize: number;
  employees: EmployeeDTO[];

  messages: string[] = [];

  public searchFormGroup: FormGroup;
  
  constructor(private fb: FormBuilder, private employeesService: EmployeesService, private snackBarService: SnackBarService) {
    this.employees = [];
    this.pageSize = 4;
    this.currentPage = 1;
    this.totalSize = 1;
    this.searchFormGroup = this.fb.group({
      searchField: [''],
      userType: ['']
    });
  }

  ngAfterViewInit(): void {
    this.employeesService.findAllEmployees(this.currentPage - 1, this.pageSize)
      .subscribe((response) => {
        this.employees = response.body as EmployeeDTO[];
        console.log(this.employees);
        this.totalSize = Number(response.headers.get("total-elements"));
        this.setPagination(response.headers.get('total-elements'), response.headers.get('current-page'));
      });

      this.onChanges();
  }

  changePage(newPage: number) {
    // this.employeesService.findAllEmployees(newPage - 1, this.pageSize)
    //   .subscribe((response) => {
    //     this.employees = response.body as EmployeeDTO[];
    //     this.totalSize = Number(response.headers.get("total-elements"));
    //   });
    this.employeesService.searchEmployees
    (this.searchFormGroup.value.searchField,
       this.searchFormGroup.value.userType, newPage - 1, this.pageSize).subscribe((res) => {
      if (res.body != null) {
        this.employees = res.body as EmployeeDTO[];
        this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
      }
    }, (err) => {
      if (err.error)
        this.snackBarService.openSnackBar(String(err.console));
    });
  }

  allFieldsEmpty(): boolean {
    if (this.searchFormGroup.value?.searchField === '' && this.searchFormGroup.value?.userType === '') {
      return true;
    }
    return false;
  }

  setPagination(totalItemsHeader: string | null, currentPageHeader: string | null) {
    if (totalItemsHeader) {
      this.totalSize = parseInt(totalItemsHeader);
    }
    if (currentPageHeader) {
      this.currentPage = parseInt(currentPageHeader);
    }
  }

  onChanges(): void {
    this.searchFormGroup.valueChanges.subscribe(val => {
      this.employeesService.searchEmployees(val.searchField, val.userType, 0, this.pageSize).subscribe((res) => {
        if (res.body != null) {
          this.employees = res.body as EmployeeDTO[];
          console.log(this.employees);
          console.log(res.headers.get('total-elements'));
          this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
          if (this.pagination) {
            this.pagination.setActivePage(1);
          }
        }
      });
    }, (err) => {
      if (err.error)
        this.snackBarService.openSnackBar(String(err.console));
    });
  }
}
