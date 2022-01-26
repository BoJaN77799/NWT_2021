import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent {

  notifications: Notification[];

  constructor(public dialogRef: MatDialogRef<NotificationModalComponent>, @Inject(MAT_DIALOG_DATA) private _notifications: Notification[]) {
    this.notifications = _notifications
  }

  seenAll() {
    this.dialogRef.close(this.notifications);
  }
  seenOne(notification: Notification) {
    let index = this.notifications.indexOf(notification);
    this.notifications.splice(index, 1);
  }
}
