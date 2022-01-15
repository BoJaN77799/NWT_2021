import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { FoodSearchService } from '../../services/food-search.service';

@Component({
  selector: 'app-create-order-page',
  templateUrl: './create-order-page.component.html',
  styleUrls: ['./create-order-page.component.scss']
})
export class CreateOrderPageComponent implements OnInit {

  item1 : Item = {id: 1, name: "Jagnjece pecenje1", description: "Jako ukusno", price: 1201, imgSrc: undefined };
  item2 : Item = {id: 2, name: "Jagnjece pecenje2", description: "Jako ukusno", price: 1202, imgSrc: undefined };
  item3 : Item = {id: 3, name: "Jagnjece pecenje3", description: "Jako ukusno", price: 1203, imgSrc: undefined };
  item4 : Item = {id: 4, name: "Jagnjece pecenje4", description: "Jako ukusno", price: 1204, imgSrc: undefined };
  item5 : Item = {id: 5, name: "Jagnjece pecenje5", description: "Jako ukusno", price: 1205, imgSrc: undefined };
  item6 : Item = {id: 6, name: "Jagnjece pecenje6", description: "Jako ukusno", price: 1206, imgSrc: undefined };
  item7 : Item = {id: 7, name: "Jagnjece pecenje7", description: "Jako ukusno", price: 1207, imgSrc: undefined };

  items : Item[] = [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7];

  constructor(private foodSearchService : FoodSearchService) {}

  ngOnInit(): void {
    this.foodSearchService.searchFood().subscribe((response) => {
      console.log(response);
      // Implementirati da prima generik da bih mogao da preuzmem valjda zaglavlja jebem li ga
    })
  }

  changePageFood(nextPage: number): void {
    
  }

  changePageDrink(nextPage: number): void {
    // Dobavi sledecu stranu sa parametrima iz search i ostalog
  }
  
}
