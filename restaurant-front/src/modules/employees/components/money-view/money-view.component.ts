import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConformationDialogComponent } from 'src/modules/shared/components/conformation-dialog/conformation-dialog.component';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { BonusDTO } from '../../models/BonusDTO';
import { IndicatorEmployee } from '../../models/IndicatorEmail';
import { SalaryDTO } from '../../models/SalaryDTO';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-money-view',
  templateUrl: './money-view.component.html',
  styleUrls: ['./money-view.component.scss']
})
export class MoneyViewComponent implements OnInit{

  title: string;
  header: string;
  label: string;
  content: string [] = [];

  value: number;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<MoneyViewComponent>,
    @Inject(MAT_DIALOG_DATA) public indicatorEmployee: IndicatorEmployee,  
    private employeesService: EmployeesService, 
    private snackBarService: SnackBarService) 
  {
    this.value = 0;
    this.title = (indicatorEmployee.indicator) ? "Salaries" : "Bonuses";
    this.header = (indicatorEmployee.indicator) ? "Create a new salary for selected employee." 
                  : "Create a new bonus for selected employee.";
    this.label = (indicatorEmployee.indicator) ? "New Salary" : "New Bonus";
  }

  ngOnInit(): void {
    if (this.indicatorEmployee.indicator) { // Salaries
      this.employeesService.getSalariesOfEmployee(this.indicatorEmployee.employee.email)
          .subscribe((response) => {
              this.content = this.employeesService.convertSalariesToContent(response.body as SalaryDTO[]);
          }, 
          (err) => {
            if (err.status === 404) {
              this.snackBarService.openSnackBar("List of salaries is empty!");
            }
            else if (err.status === 400) {
              this.snackBarService.openSnackBar("Invalid user!");
            }
          });
    } else { // Bonuses
      this.employeesService.getBonusesOfEmployee(this.indicatorEmployee.employee.email)
          .subscribe((response) => {
            this.content = this.employeesService.convertBonusesToContent(response.body as BonusDTO[]);
          },
          (err) => {
            if (err.status === 404) {
              this.snackBarService.openSnackBar("List of bonuses is empty!");
            }
            else if (err.status === 400) {
              this.snackBarService.openSnackBar("Invalid user!");
            }
          });
    }
  }

  createContent(): void {
    if (this.value) {
      if (this.indicatorEmployee.indicator) {
        this.createNewSalary(this.value);
      } else {
        this.createNewBonus(this.value);
      }
    }
  }

  createNewSalary(value: number): void {
    let newSalary = { amount: value, email: this.indicatorEmployee.employee.email };
    this.dialog.open(ConformationDialogComponent, {
      data: 
      { 
        title: "Creating a new salart",
        message: "You want to create a salart  " + newSalary.amount + " RSD."
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.employeesService.createNewSalary(newSalary as SalaryDTO)
        .subscribe((response) => {
          this.snackBarService.openSnackBar(response.body as string);
          this.employeesService.getSalariesOfEmployee(this.indicatorEmployee.employee.email)
          .subscribe((newResponse) => {
            this.content = this.employeesService.convertSalariesToContent(newResponse.body as SalaryDTO[]);
            this.indicatorEmployee.employee.salary = value; // podesimo platu radniku
          })
        }, 
        (err) => {
          this.snackBarService.openSnackBar(err.error as string);
        });
      }
    });
  }

  createNewBonus(value: number): void {
    let newBonus = { amount: value, email: this.indicatorEmployee.employee.email };
    this.dialog.open(ConformationDialogComponent, {
      data: 
      { 
        title: "Creating bonus",
        message: "You want to create a new bonus  " + newBonus.amount + " RSD."
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        this.employeesService.createNewBonus(newBonus as BonusDTO)
        .subscribe((response) => {
          this.snackBarService.openSnackBar(response.body as string);
          this.employeesService.getBonusesOfEmployee(this.indicatorEmployee.employee.email)
          .subscribe((newResponse) => {
            this.content = this.employeesService.convertBonusesToContent(newResponse.body as BonusDTO[]);
          })
        },
        (err) => {
          this.snackBarService.openSnackBar(err.error as string);
        })
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
