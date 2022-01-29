import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { telephoneValidator } from 'src/modules/shared/directives/custom-validator/telephone-validator';
import { UserInfoView } from 'src/modules/shared/models/user-info-view';
import { UserProfileService } from 'src/modules/root/service/user-profile.service';
import { UserUpdate } from 'src/modules/root/models/user-update';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent {

  private userId: number;
  public user: UserInfoView;

  isAdmin: boolean;
  isWorker: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: { user: UserInfoView, isAdmin: boolean, isWorker: boolean },
    private userService: UserProfileService,
    private fb: FormBuilder,
    public dialog: MatDialog, public dialogRef: MatDialogRef<ProfileViewComponent>,
    private snackBarService: SnackBarService
  ) {
    this.userId = passedData.user.id;
    this.user = passedData.user;
    this.isAdmin = passedData.isAdmin;
    this.isWorker = passedData.isWorker;
    this.updateUserFormGroup = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email],
      gender: [this.user.gender],
      telephone: [this.user.telephone, [Validators.required, Validators.minLength(5), Validators.maxLength(12), telephoneValidator()]],
      address: [this.user.address, Validators.required],
      userType: [this.user.userType],
      status: [this.user.active ? 'active' : 'deleted'],
      salary: [this.user.salary ? this.user.salary : 0]
    });
  }

  previewImg: string | undefined;
  selectedImg: File | undefined;

  public loadVisible: boolean = false;

  public updateUserFormGroup: FormGroup;


  public changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: this.user.id,
      width: '500px',
      height: '50vh'
    });
  }

  public selectImage(event: any) {
    let selectedFiles = event.target.files;


    if (selectedFiles && selectedFiles[0]) {
      this.selectedImg = selectedFiles[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImg = e.target.result;
      }
      reader.readAsDataURL(selectedFiles[0]);
    }
  }

  private getUserToUpdate(): UserUpdate {
    let firstname = this.updateUserFormGroup.controls['firstName'].value;
    let lastname = this.updateUserFormGroup.controls['lastName'].value;
    let telephone = this.updateUserFormGroup.controls['telephone'].value;
    let address = this.updateUserFormGroup.controls['address'].value;

    let userToUpdate: UserUpdate = { id: this.userId, firstName: firstname, lastName: lastname, telephone: telephone, address: address };
    return userToUpdate;
  }

  public saveChanges() {
    if (!this.updateUserFormGroup.valid) {
      this.snackBarService.openSnackBar("Can't save changes, user info invalid!");
      return;
    }

    let userToUpdate: UserUpdate = this.getUserToUpdate();

    this.loadVisible = true;

    this.userService.updateUser(userToUpdate, this.selectedImg).subscribe((res) => {
      if (res.body != null) {
        this.loadVisible = false;
        this.dialogRef.close(userToUpdate);
        this.snackBarService.openSnackBar("User info updated!");
      }
    },
      (err) => {
        this.snackBarService.openSnackBar(err.error);
        this.loadVisible = false;
      });
  }

}
