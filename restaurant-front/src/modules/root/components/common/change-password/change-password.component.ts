import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserProfileService } from 'src/modules/root/service/user-profile.service';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public userId: number,
    private userService: UserProfileService,
    private fb: FormBuilder,
    public dialog: MatDialog, public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackBarService: SnackBarService
  ) {
    this.changePasswordFormGroup = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.maxLength(12)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    });
  }

  ngOnInit(): void {
    console.log("inited change pw");
  }

  public changePasswordFormGroup: FormGroup;

  public changePassword() {
    let oldPw = this.changePasswordFormGroup.controls['oldPassword'].value;
    let newPw = this.changePasswordFormGroup.controls['newPassword'].value;
    if (!this.changePasswordFormGroup.valid) {
      this.snackBarService.openSnackBar("Can't change password, info not valid!");
      return;
    }

    this.userService.changePassword(this.userId, oldPw, newPw).subscribe((res) => {
      if (res.body != null) {
        this.dialogRef.close();
        this.snackBarService.openSnackBar(String(res.body));
      }
    },
      (err) => {
        this.snackBarService.openSnackBar(err.error);
      });
  }


  // private getUserToUpdate(): UserUpdate {
  //   let firstname = this.updateUserFormGroup.controls['firstName'].value;
  //   let lastname = this.updateUserFormGroup.controls['lastName'].value;
  //   let telephone = this.updateUserFormGroup.controls['telephone'].value;
  //   let address = this.updateUserFormGroup.controls['address'].value;

  //   let userToUpdate: UserUpdate = { id: this.userId, firstName: firstname, lastName: lastname, telephone: telephone, address: address };
  //   return userToUpdate;
  // }

  // public saveChanges() {
  //   if (!this.updateUserFormGroup.valid) {
  //     this.snackBarService.openSnackBar("Can't save changes, user info invalid!");
  //     return;
  //   }

  //   let userToUpdate: UserUpdate = this.getUserToUpdate();

  //   this.loadVisible = true;

  //   this.userService.updateUser(userToUpdate, this.selectedImg).subscribe((res) => {
  //     if (res.body != null) {
  //       this.loadVisible = false;
  //       this.dialogRef.close(userToUpdate);
  //       this.snackBarService.openSnackBar("User info updated!");
  //     }
  //   },
  //     (err) => {
  //       this.snackBarService.openSnackBar(err.error);
  //       this.loadVisible = false;
  //     });
  // }
}
