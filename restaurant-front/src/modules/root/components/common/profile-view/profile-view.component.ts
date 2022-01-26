import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { telephoneValidator } from 'src/modules/shared/directives/custom-validator/telephone-validator';
import { UserInfoView } from 'src/modules/shared/models/user-info-view';
import { UserProfileService } from 'src/modules/root/service/user-profile.service';
import { UserUpdate } from 'src/modules/root/models/user-update';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  private userId: number;

  @Input() isAdmin: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public user: UserInfoView,
    private userService: UserProfileService,
    private fb: FormBuilder,
    public dialog: MatDialog, public dialogRef: MatDialogRef<ProfileViewComponent>,
    private snackBarService: SnackBarService
  ) {
    this.userId = user.id;
    this.isAdmin = false;
    this.updateUserFormGroup = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email],
      gender: [user.gender],
      telephone: [user.telephone, [Validators.required, Validators.minLength(5), Validators.maxLength(12), telephoneValidator()]],
      address: [user.address, Validators.required],
      userType: [user.userType],
      status: [user.active ? 'active' : 'deleted']
    });
  }

  previewImg: string | undefined;
  selectedImg: File | undefined;

  public loadVisible: boolean = false;

  public updateUserFormGroup: FormGroup;


  ngOnInit(): void {

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
