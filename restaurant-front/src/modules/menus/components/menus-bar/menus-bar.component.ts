import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { MenusService } from '../../services/menus.service';
import { CreateMenuDialogComponent } from '../create-menu-dialog/create-menu-dialog.component';
import { UpdateMenuDialogComponent } from '../update-menu-dialog/update-menu-dialog.component';

@Component({
  selector: 'app-menus-bar',
  templateUrl: './menus-bar.component.html',
  styleUrls: ['./menus-bar.component.scss']
})
export class MenusBarComponent implements OnInit {
  menusNames: string[] = [];
  selectedName: string = '';

  @Output()
  optionSelected: EventEmitter<string>;

  constructor(public dialog: MatDialog, 
    private menusService: MenusService, private snackBarService: SnackBarService) {
      this.optionSelected = new EventEmitter();
  }

  ngOnInit(): void {
    this.refreshActiveMenuNames();
  }

  optionChanged(event: string):void {
    this.optionSelected.emit(event);
  }

  refreshActiveMenuNames(): void {
    this.menusService.findAllActiveMenuNames()
        .subscribe((response) => {
          this.menusNames = response.body as string[];
        },
        (err) => {
          this.snackBarService.openSnackBar("Empty list!");
        })
  }

  openCreateMenuDialog(): void {
    this.dialog.open(CreateMenuDialogComponent)
        .afterClosed().subscribe(() => this.refreshActiveMenuNames());
    
    
  }

  openActivateMenuDialog(): void {
    this.dialog.open(UpdateMenuDialogComponent, {
      data: true,
    }).afterClosed().subscribe(() => this.refreshActiveMenuNames());
  }

  openDeactivateMenuDialog(): void {
    this.dialog.open(UpdateMenuDialogComponent, {
      data: false,
    }).afterClosed().subscribe(() => this.refreshActiveMenuNames());
  }
}
