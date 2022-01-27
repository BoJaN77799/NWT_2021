import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  employeeId: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private utilService: UtilService,
    private snackBarService: SnackBarService
  ) {
    this.notifications = [];
    this.employeeId = -1;
  }

  ngAfterViewInit() {
    this.employeeId = this.utilService.getLoggedUserId();
    this.notificationService.getAllNotifications(this.employeeId).subscribe((res) => {
      if (res.body) {
        this.notifications = res.body;
      }
    })
  }


  logout() {
    this.authService.logout();
  }

  notificationModal(): void {
    if (this.notifications.length == 0) {// everytime after view init
      this.notificationService.getAllNotifications(this.employeeId).subscribe((res) => {
        if (res.body) {
          this.notifications = res.body;
          if (this.notifications.length != 0) { // has at least one notif unseened
            const dialogRef = this.dialog.open(NotificationModalComponent, {
              data: this.notifications,
              width: '60%',
            });

            dialogRef.afterClosed().subscribe(() => {
              this.notifications = [];
            });
          }
          else {
            this.snackBarService.openSnackBar("You don't have any notifications to display!")
          }
        }
      })
    }
    else {
      if (this.notifications.length != 0) {
        const dialogRef = this.dialog.open(NotificationModalComponent, {
          data: this.notifications,
          width: '60%',
        });

        dialogRef.afterClosed().subscribe(() => {
          this.notifications = [];
        });
      }
      else {
        this.snackBarService.openSnackBar("You don't have any notifications to display!")
      }
    }

  }

}
