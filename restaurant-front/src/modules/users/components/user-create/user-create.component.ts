import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { emailValidator } from '../../../shared/directives/custom-validator/email-validator';
import { telephoneValidator } from '../../../shared/directives/custom-validator/telephone-validator';
import { UserCreate } from '../../models/user-create';
import { UsersService } from '../../services/users-service/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  previewImg: string | undefined; 
  selectedImg: File | undefined;

  public loadVisible : boolean = false;

  public createUserFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, public dialog: MatDialog,public dialogRef: MatDialogRef<UserCreateComponent>,
    private snackBarService: SnackBarService) {
    this.createUserFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, emailValidator()]],
      gender: ['MALE', Validators.required],
      telephone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), telephoneValidator()]],
      address: ['', Validators.required],
      userType: ['ADMINISTRATOR', Validators.required]
    });
   }

  ngOnInit(): void {
    
  }

  public selectImage(event: any){
    let selectedFiles = event.target.files;


    if (selectedFiles && selectedFiles[0]){
      this.selectedImg = selectedFiles[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImg = e.target.result;
      }
      reader.readAsDataURL(selectedFiles[0]);
    }
  }

  public createUser(){
    let created : UserCreate = this.createUserFormGroup.value;

    this.loadVisible = true;

    this.usersService.createUser(created, this.selectedImg).subscribe((res) => {
      if(res.body != null){
        this.loadVisible = false;
        this.dialogRef.close(true);
        this.snackBarService.openSnackBar("User added!");
      }
      //todo toast za error, i dodati load visible false
    });
  }

  public removeImage(){
    this.previewImg = undefined;
    this.selectedImg = undefined;
  }

}
