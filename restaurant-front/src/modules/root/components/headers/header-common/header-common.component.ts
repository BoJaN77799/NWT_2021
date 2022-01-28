import { UserProfileService } from 'src/modules/root/service/user-profile.service';
import { ProfileViewComponent } from '../../common/profile-view/profile-view.component';
import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/modules/auth/services/auth-service/auth.service';
import { NotificationModalComponent } from 'src/modules/shared/components/notification-modal/notification-modal.component';
import { NotificationService } from 'src/modules/shared/services/notification.service';
import { UtilService } from 'src/modules/shared/services/util/util.service';
import { Notification } from 'src/modules/shared/models/notification'
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';

@Component({
  selector: 'app-header-common',
  templateUrl: './header-common.component.html',
  styleUrls: ['./header-common.component.scss']
})
export class HeaderCommonComponent implements AfterViewInit {

  notifications: Notification[];
  notificationsSize: number;
  employeeId: number;
  role: string;

  constructor(
    private authService: AuthService,
    private userService: UserProfileService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private utilService: UtilService,
    private snackBarService: SnackBarService
  ) {
    this.notifications = [];
    this.notificationsSize = 0;
    this.employeeId = -1;
    this.role = '';
  }

  ngAfterViewInit() {
    this.role = this.utilService.getLoggedUserRole();
    if (this.role !== 'ADMINISTRATOR' && this.role !== 'MANAGER'){
      this.employeeId = this.utilService.getLoggedUserId();
      this.notificationService.getAllNotifications(this.employeeId).subscribe((res) => {
        if (res.body) {
          this.notifications = res.body;
          this.notificationsSize = this.notifications.length;
        }
      })

    this.notificationService.notificationMessage$.subscribe((notification) => {
      this.notificationsSize += 1;
      this.notificationService.getAllNotifications(this.employeeId).subscribe((res) => {
        if (res.body) {
          this.notifications = res.body;
          this.notificationsSize = this.notifications.length;
        }
      })
    })
    }
  }


  logout() {
    this.authService.logout();
  }

  profile() {
    this.userService.getUserInfo(this.employeeId).subscribe((res) => {
      if (res.body != null) {
        const dialogRef = this.dialog.open(ProfileViewComponent, {
          data: { user: res.body, isAdmin: false, isWorker: this.utilService.isUserWorker() },
          width: '600px',
          height: '80vh'
        });
      }
    }, (err) => { this.snackBarService.openSnackBar(err.error) });
  }

  notificationModal(): void {
    if (this.notifications.length == 0) {
      this.snackBarService.openSnackBar("You don't have any notifications to display!")
    }
    else {
      const dialogRef = this.dialog.open(NotificationModalComponent, {
        data: this.notifications,
        width: '60%',
      });

      dialogRef.afterClosed().subscribe((condition = false) => {
        if (condition) {
          this.notifications = [];
          this.notificationsSize = 0;
        } else {
          this.notificationsSize = this.notifications.length
        }
      });
    }

  }

}
