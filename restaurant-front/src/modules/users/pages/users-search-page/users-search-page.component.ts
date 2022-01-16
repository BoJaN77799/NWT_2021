import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserTableView } from '../../models/user-table-view';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-users-search-page',
  templateUrl: './users-search-page.component.html',
  styleUrls: ['./users-search-page.component.scss']
})
export class UsersSearchPageComponent implements OnInit, AfterViewInit {

  //todo proveriti jos paginaciju i te sitnice da nema bagova, isto i za sortiranje - dodaj brdo korisnika pa ces videti dal valja

  //todo sredi da i ono za getall vraca i admina, glupo je da jedno vraca a drugo ne lol

  //table
  public usersList : UserTableView[] = [];
  dataSource = new MatTableDataSource(this.usersList);
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'userType', 'active', 'email', 'telephone', 'isPaswordChanged'];

  //pagination
  public totalItems : number = 10;
  public pageSize: number = 3;
  currentPage : number = 1;

  //forma
  public searchFormGroup: FormGroup;

  //sort
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.searchFormGroup = this.fb.group({
      searchField: [''],
      userType: ['']
    });
   }

  setPagination(totalItemsHeader : string | null, currentPageHeader : string | null){
    if (totalItemsHeader){
      this.totalItems = parseInt(totalItemsHeader);
    }
    if (currentPageHeader){
      this.currentPage = parseInt(currentPageHeader);
    }
  }

  ngOnInit(): void {
    this.usersService.getUsers(0, this.pageSize, '', '').subscribe((res) => {
      if(res.body != null){
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

  onChanges() : void {
    this.searchFormGroup.valueChanges.subscribe(val => {
      this.usersService.searchUsers(val.searchField, val.userType, 0, this.pageSize, this.dataSource.sort?.active, this.dataSource.sort?.direction).subscribe((res) => {
        if(res.body != null){
          this.dataSource.data = res.body;
          this.totalItems = -1; //da bi resetovali paginaciju, tj da bi se prebacilo na prvu stranu
          this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
        }
        //todo error
      });
    });
  }

  onSort(event: any){
    this.usersService.searchUsers(this.searchFormGroup.value.searchField, this.searchFormGroup.value.userType, 
                                  this.currentPage, this.pageSize, event.active, event.direction).subscribe((res) => {
      if(res.body != null){
        this.dataSource.data = res.body;
        //ovde se radi samo sortiranje, nema menjanja sadrzaja
        //this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
      }
      //todo error
    });
  }

  public nista(user: UserTableView){
    //ovde ubaciti onclick na user-a - otvaranje modala i to
  }

  allFieldsEmpty() : boolean{
    if (this.searchFormGroup.value?.searchField === '' && this.searchFormGroup.value?.userType === ''){
      return true;
    }
    return false;
  }

  changePage(newPage: number) {
    if (this.allFieldsEmpty()){
      this.usersService.getUsers(newPage-1, this.pageSize, this.dataSource.sort?.active, this.dataSource.sort?.direction).subscribe((res) => {
        if(res.body != null){
          this.dataSource.data = res.body;
          this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
        }
        //todo error
      });
    }else{
      this.usersService.searchUsers(this.searchFormGroup.value.searchField, this.searchFormGroup.value.userType, newPage-1, this.pageSize, this.dataSource.sort?.active, this.dataSource.sort?.direction).subscribe((res) => {
        if(res.body != null){
          this.dataSource.data = res.body;
          this.setPagination(res.headers.get('total-elements'), res.headers.get('current-page'));
        }
        //todo error
      });
    }
  }

}
