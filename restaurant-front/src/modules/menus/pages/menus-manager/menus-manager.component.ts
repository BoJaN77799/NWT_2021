import { Component, ViewChild } from '@angular/core';
import { PaginationComponent } from 'src/modules/shared/components/pagination/pagination.component';
import { ItemMenuDTO } from '../../models/ItemMenuDTO';
import { ItemsService } from '../../services/items.service';
import { MenusService } from '../../services/menus.service';

@Component({
  selector: 'app-menus-manager',
  templateUrl: './menus-manager.component.html',
  styleUrls: ['./menus-manager.component.scss']
})
export class MenusManagerComponent  {

  selectedName: string = '';

  pageSize: number;
  currentPage: number;
  totalSize: number;

  items: ItemMenuDTO[];

  @ViewChild(PaginationComponent) child:PaginationComponent | undefined;
  
  constructor(private menusService: MenusService, private itemsService: ItemsService) {
    this.pageSize = 3;
    this.currentPage = 1;
    this.totalSize = 1;
    this.items = [];
  }

  renderList() {
    if (this.selectedName && this.selectedName !== ''){
      this.takeSelectedName(this.selectedName);
    }
  }

  takeSelectedName(optionSelected: any): void {
    this.child?.reset();
    this.selectedName = optionSelected as string;
    if (this.selectedName && this.selectedName !== '') {
      this.itemsService.findAllItemsWithMenuName(this.selectedName, this.currentPage - 1, this.pageSize)
        .subscribe((response) => {
          this.items = response.body as ItemMenuDTO[];
          this.totalSize = Number(response.headers.get("total-elements"));
          console.log(this.items);
        });
    }
  }

  changePage(newPage: number) {
    this.itemsService.findAllItemsWithMenuName(this.selectedName, newPage - 1, this.pageSize)
        .subscribe((response) => {
          this.items = response.body as ItemMenuDTO[];
          this.totalSize = Number(response.headers.get("total-elements"));
          console.log(this.items);
        });
  }
}
