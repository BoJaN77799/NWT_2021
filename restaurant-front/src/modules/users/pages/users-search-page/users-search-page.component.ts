import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationComponent } from 'src/modules/shared/components/pagination/pagination.component';
import { UserCreateComponent } from '../../components/user-create/user-create.component';
import { UserInfoView } from '../../../shared/models/user-info-view';
import { UserTableView } from '../../models/user-table-view';
import { UsersService } from '../../services/users-service/users.service';
import { UserUpdate } from '../../../root/models/user-update';
import { ProfileViewComponent } from 'src/modules/root/components/common/profile-view/profile-view.component';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { UtilService } from 'src/modules/shared/services/util/util.service';

@Component({
  selector: 'app-users-search-page',
  templateUrl: './users-search-page.component.html',
  styleUrls: ['./users-search-page.component.scss']
})
export class UsersSearchPageComponent implements OnInit, AfterViewInit {

  public adminId: number;

  //table
  public usersList: UserTableView[] = [];
  dataSource = new MatTableDataSource(this.usersList);
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'userType', 'active', 'email', 'telephone', 'isPaswordChanged', 'delete'];

  //pagination
  @ViewChild(PaginationComponent) pagination?: PaginationComponent;
  public totalItems: number = 10;
  public pageSize: number = 3;
  currentPage: number = 1;

  //forma
  public searchFormGroup: FormGroup;

  //sort
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private fb: FormBuilder, private usersService: UsersService, public dialog: MatDialog, private snackBarService: SnackBarService,
    private utilService: UtilService) {
    this.adminId = utilService.getLoggedUserId();
    this.searchFormGroup = this.fb.group({
      searchField: [''],
      userType: ['']
    });
  }

  setPagination(totalItemsHeader: string | null, currentPageHeader: string | null) {
    if (totalItemsHeader) {
      this.totalItems = parseInt(totalItemsHeader);
    }
    if (currentPageHeader) {
      this.currentPage = parseInt(currentPageHeader);
    }
  }

  ngOnInit(): void {
    this.usersService.searchUsers('', '', 0, this.pageSize, '', '').subscribe((res) => {
      if (res.body != null) {
        this.dataSource.data = res.body;
        this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
      }
    }, (err) => {
      if (err.error)
        this.snackBarService.openSnackBar(String(err.console));
    });

    this.onChanges();
  }

  ngAfterViewInit() {
    if (this.sort)
      this.dataSource.sort = this.sort;
  }

  onChanges(): void {
    this.searchFormGroup.valueChanges.subscribe(val => {
      this.usersService.searchUsers(val.searchField, val.userType, 0, this.pageSize, this.dataSource.sort?.active, this.dataSource.sort?.direction).subscribe((res) => {
        if (res.body != null) {
          this.dataSource.data = res.body;
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

  reloadUsers() {
    this.usersService.searchUsers(this.searchFormGroup.value.searchField, this.searchFormGroup.value.userType,
      this.currentPage, this.pageSize, "", "").subscribe((res) => {
        if (res.body != null) {
          this.dataSource.data = res.body;
          this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
          if (this.pagination) {
            this.pagination.setActivePage(this.currentPage + 1); //current page je za server, krece od 0
          }
        }
      }, (err) => {
        if (err.error)
          this.snackBarService.openSnackBar(String(err.console));
      });
  }

  onSort(event: any) {
    this.usersService.searchUsers(this.searchFormGroup.value.searchField, this.searchFormGroup.value.userType,
      this.currentPage, this.pageSize, event.active, event.direction).subscribe((res) => {
        if (res.body != null) {
          this.dataSource.data = res.body;
          //ovde se radi samo sortiranje, nema menjanja sadrzaja
        }
      }, (err) => {
        if (err.error)
          this.snackBarService.openSnackBar(String(err.console));
      });
  }

  public createNew() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '600px',
      height: '80vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadUsers();
      }
    });
  }

  private updateUser(userToUpdt: UserUpdate) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].id === userToUpdt.id) {
        this.dataSource.data[i].firstName = userToUpdt.firstName;
        this.dataSource.data[i].lastName = userToUpdt.lastName;
        this.dataSource.data[i].telephone = userToUpdt.telephone;
      }
    }
  }

  public deleteUserLocaly(id: number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].id === id) {
        this.dataSource.data[i].active = false;
        return;
      }
    }
  }

  public deleteUser(event: any, id: number) {
    event.stopImmediatePropagation();
    this.usersService.deleteUser(id).subscribe((res) => {
      if (res.body != null) {
        this.deleteUserLocaly(id);
        this.snackBarService.openSnackBar("User deactivated!");
      }
    }, (err) => {
      if (err.error)
        this.snackBarService.openSnackBar(String(err.console));
    });
  }

  public selectedUser(user: UserTableView) {
    this.usersService.getUserInfo(user.id).subscribe((res) => {
      if (res.body != null) {
        const dialogRef = this.dialog.open(ProfileViewComponent, {
          data: { user: res.body, isAdmin: true, isWorker: user.userType !== 'ADMINISTRATOR' && user.userType !== 'MANAGER' },
          width: '600px',
          height: '80vh'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.updateUser(result as UserUpdate);
          }
        });
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

  changePage(newPage: number) {
    this.usersService.searchUsers(this.searchFormGroup.value.searchField, this.searchFormGroup.value.userType, newPage - 1, this.pageSize, this.dataSource.sort?.active, this.dataSource.sort?.direction).subscribe((res) => {
      if (res.body != null) {
        this.dataSource.data = res.body;
        this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
      }
    }, (err) => {
      if (err.error)
        this.snackBarService.openSnackBar(String(err.console));
    });
  }

}
