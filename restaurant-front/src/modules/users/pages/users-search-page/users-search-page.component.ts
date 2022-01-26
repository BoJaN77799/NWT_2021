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

@Component({
  selector: 'app-users-search-page',
  templateUrl: './users-search-page.component.html',
  styleUrls: ['./users-search-page.component.scss']
})
export class UsersSearchPageComponent implements OnInit, AfterViewInit {

  //todo proveriti jos paginaciju i te sitnice da nema bagova, isto i za sortiranje - dodaj brdo korisnika pa ces videti dal valja

  //todo sredi da i ono za getall vraca i admina, glupo je da jedno vraca a drugo ne lol

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

  constructor(private fb: FormBuilder, private usersService: UsersService, public dialog: MatDialog, private snackBarService: SnackBarService) {
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
    this.usersService.getUsers(0, this.pageSize, '', '').subscribe((res) => {
      if (res.body != null) {
        this.dataSource.data = res.body;
        this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
      }
      //todo error
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
        //todo error
      });
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
        //todo error
      });
  }

  onSort(event: any) {
    this.usersService.searchUsers(this.searchFormGroup.value.searchField, this.searchFormGroup.value.userType,
      this.currentPage, this.pageSize, event.active, event.direction).subscribe((res) => {
        if (res.body != null) {
          this.dataSource.data = res.body;
          //ovde se radi samo sortiranje, nema menjanja sadrzaja
          //this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
        }
        //todo error
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
      //todo toast za error
    });
  }

  public selectedUser(user: UserTableView) {
    this.usersService.getUserInfo(user.id).subscribe((res) => {
      if (res.body != null) {
        const dialogRef = this.dialog.open(ProfileViewComponent, {
          data: res.body,
          width: '600px',
          height: '80vh'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.updateUser(result as UserUpdate);
          }
        });
      }
      //todo error
    });
  }

  allFieldsEmpty(): boolean {
    if (this.searchFormGroup.value?.searchField === '' && this.searchFormGroup.value?.userType === '') {
      return true;
    }
    return false;
  }

  changePage(newPage: number) {
    // if (this.allFieldsEmpty()){
    //   this.usersService.getUsers(newPage-1, this.pageSize, this.dataSource.sort?.active, this.dataSource.sort?.direction).subscribe((res) => {
    //     if(res.body != null){
    //       this.dataSource.data = res.body;
    //       this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
    //     }
    //     //todo error
    //   });
    // }else{
    this.usersService.searchUsers(this.searchFormGroup.value.searchField, this.searchFormGroup.value.userType, newPage - 1, this.pageSize, this.dataSource.sort?.active, this.dataSource.sort?.direction).subscribe((res) => {
      if (res.body != null) {
        this.dataSource.data = res.body;
        this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
      }
      //todo error
    });
    //}
  }

}
