import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private matSnackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string="okey",
    hPosition: any="center", vPosition : any="top",
    className: any="snack-style" ) {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: hPosition ? hPosition : 'center',
      verticalPosition: vPosition ? vPosition : 'top',
      panelClass: className
    });
  }
}
