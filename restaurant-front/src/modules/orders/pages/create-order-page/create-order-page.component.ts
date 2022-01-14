import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-create-order-page',
  templateUrl: './create-order-page.component.html',
  styleUrls: ['./create-order-page.component.scss']
})
export class CreateOrderPageComponent implements OnInit {

  item : Item = {id: 1, name: "Jagnjece pecenje", description: "Jako ukusno", price: 1200, imgSrc: undefined };

  constructor() { }

  ngOnInit(): void {
  }

}
