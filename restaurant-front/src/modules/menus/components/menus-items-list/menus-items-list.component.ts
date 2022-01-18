import { AfterViewInit, Component, Input } from '@angular/core';
import { ItemMenuDTO } from '../../models/ItemMenuDTO';

@Component({
  selector: 'app-menus-items-list',
  templateUrl: './menus-items-list.component.html',
  styleUrls: ['./menus-items-list.component.scss']
})
export class MenusItemsListComponent implements AfterViewInit {

  @Input() items: ItemMenuDTO[] = [];
  @Input() selectedName: string = '';

  constructor() { 
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }



}
