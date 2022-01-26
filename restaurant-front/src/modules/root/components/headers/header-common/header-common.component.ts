import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/modules/auth/services/auth-service/auth.service';
import { UserUpdate } from 'src/modules/root/models/user-update';
import { UserProfileService } from 'src/modules/root/service/user-profile.service';
import { ProfileViewComponent } from '../../common/profile-view/profile-view.component';

@Component({
  selector: 'app-header-common',
  templateUrl: './header-common.component.html',
  styleUrls: ['./header-common.component.scss']
})
export class HeaderCommonComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserProfileService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    //this.router.navigate(["rest-app/auth/login"]);
  }

  profile() {
    // this.userService.getUserInfo(user.id).subscribe((res) => {
    //   if (res.body != null) {
    //     const dialogRef = this.dialog.open(ProfileViewComponent, {
    //       data: res.body,
    //       width: '600px',
    //       height: '80vh'
    //     });
    //   }
    //   //todo error
    // });
  }

}
