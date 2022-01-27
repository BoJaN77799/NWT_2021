import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../shared/models/item';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent {

  @Input()
  cards: Item[] = [];

  constructor() { }

}
