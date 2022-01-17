import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoView } from '../../models/user-info-view';

@Component({
  selector: 'app-user-view-info',
  templateUrl: './user-view-info.component.html',
  styleUrls: ['./user-view-info.component.scss']
})
export class UserViewInfoComponent implements OnInit {

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public user: UserInfoView,
  ) {}

  ngOnInit(): void {
    
  }

}
