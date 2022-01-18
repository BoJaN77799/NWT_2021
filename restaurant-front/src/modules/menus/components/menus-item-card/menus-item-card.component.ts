import { Component, Input, OnInit } from '@angular/core';
import { ItemMenuDTO } from '../../models/ItemMenuDTO';

@Component({
  selector: 'app-menus-item-card',
  templateUrl: './menus-item-card.component.html',
  styleUrls: ['./menus-item-card.component.scss']
})
export class MenusItemCardComponent {

  @Input() item: ItemMenuDTO = {
    id: 0,
    name: '',
    description: '',
    image: '',
    cost: 0,
    currentPrice: 0,
    itemType: '',
    menu: ''
  }

  @Input() selectedName: string = '';
  
  constructor() { }

  addItemToMenu(): void {

  }

  removeItemFromMenu(): void {

  }

}
