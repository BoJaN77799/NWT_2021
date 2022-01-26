import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/modules/auth/services/auth-service/auth.service';
import { NotificationModalComponent } from 'src/modules/shared/components/notification-modal/notification-modal.component';
import { NotificationService } from 'src/modules/shared/services/notification.service';
import { UtilService } from 'src/modules/shared/services/util/util.service';
import { Notification } from 'src/modules/shared/models/notification'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-header-common',
  templateUrl: './header-common.component.html',
  styleUrls: ['./header-common.component.scss']
})
export class HeaderCommonComponent {

  notificationsSize: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private utilService: UtilService
  ) {
    this.notificationsSize = 0;
  }


  logout() {
    this.authService.logout();
  }

  notificationModal(): void {
    let userId = this.utilService.getLoggedUserId()
    let notifications: Notification[] = [
      {
        id: 1,
        message: "Waiter Milorad created new order on table 1",
        tableId: 1,
        orderId: 1
      },
      {
        id: 2,
        message: "Cook Drasko finished order item 'Supa' and that is ready to serve.",
        tableId: 2,
        orderId: 2
      },
      {
        id: 3,
        message: "Cook Drasko bringed order item 'Coca-cola' and that is ready to serveaaa.",
        tableId: 3,
        orderId: 3
      },
      {
        id: 3,
        message: "Cook Drasko bringed order item 'Coca-cola' and that is ready to serveaaaaa.",
        tableId: 3,
        orderId: 3
      },
      {
        id: 3,
        message: "Cook Drasko bringed order item 'Coca-cola' and that is ready to serveaaa.",
        tableId: 3,
        orderId: 3
      },
      {
        id: 3,
        message: "Cook Drasko bringed order item 'Coca-cola' and that is ready to serveaa.",
        tableId: 3,
        orderId: 3
      },
      {
        id: 3,
        message: "Cook Drasko bringed order item 'Coca-cola' and that is ready to serve.",
        tableId: 3,
        orderId: 3
      },
    ]
    // this.notificationService.getAllNotifications(userId).subscribe((res) => {
    //   if (res.body) {
    //     notifications = res.body;
    //     console.log(notifications);
    this.notificationsSize = 3;
    const dialogRef = this.dialog.open(NotificationModalComponent, {
      data: notifications,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result); // svaki da se setuje na seen

    });
    //   }
    // })
  }

}
