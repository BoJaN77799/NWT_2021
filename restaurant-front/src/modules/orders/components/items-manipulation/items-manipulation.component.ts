import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackBarService } from 'src/modules/shared/services/snack-bar.service';
import { AddNewItem } from '../../models/add-new-item';
import { OrderItem } from '../../models/order-item';
import { OrderCreationDTO } from '../../models/orders';
import { AddNewItemService } from '../../services/add-new-item.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-items-manipulation',
  templateUrl: './items-manipulation.component.html',
  styleUrls: ['./items-manipulation.component.scss']
})
export class ItemsManipulationComponent implements OnInit {

  @Input()
  orderItems: OrderItem[];

  @Input()
  tableId: number;

  initiallyLoadedOrderItems: OrderItem[];

  globalPrice: number;
  note: string;

  constructor(private addNewItemService: AddNewItemService,
              private snackBarService: SnackBarService,
              private orderService: OrdersService,
              private router: Router,) { 
    this.orderItems = [];
    this.initiallyLoadedOrderItems = [];
    this.tableId = 0;
    this.globalPrice = 0;
    this.note = "";
  }

  ngOnInit(): void {
    this.addNewItemService.itemMessage$.subscribe((message) =>{
      this.addNewItemToList(message as AddNewItem);
    });

    this.saveInitiallyLoadedOrderItemsAndCalcGlobPrice();
  }

  sendOrder(): void {
    if(this.orderItems.length === 0) { this.snackBarService.openSnackBarFast('Please select items'); return; }
  
    /* Creation mode if length 0 */
    if(this.initiallyLoadedOrderItems.length === 0) {
      let orderDTO = this.createOrderCreationDTO();
      this.orderService.sendOrder(orderDTO).subscribe((response) => {
        if(response.body) {
          this.snackBarService.openSnackBarFast(response.body);
          this.router.navigate(["rest-app/orders/orders-page"]);
        }
      },
      (error) => {
        this.snackBarService.openSnackBarFast(error.error);
        this.router.navigate(["rest-app/orders/orders-page"]);
      });
    }
    else {
      // TODO: Code fore order update
      // this.addOrderItemsForDelete();
    }
  }

  addNewItemToList(newItem: AddNewItem): void {
    if(this.checkForExistingItemId(newItem))
      return;
    
    let newOrderItem: OrderItem = {
      id: null,
      itemId: newItem.id,
      name: newItem.name,
      quantity: newItem.quantity,
      price: newItem.price,
      priority: null
    };
    this.orderItems.push(newOrderItem);
    this.globalPrice += newOrderItem.quantity * newOrderItem.price;
  }

  private checkForExistingItemId(newItem: AddNewItem): boolean {
    for(let orderItem of this.orderItems) 
      if(newItem.id === orderItem.itemId) {
        orderItem.quantity += newItem.quantity;
        return true;
      }
    return false;
  }

  decreaseQuantity(item: OrderItem): void {
    item.quantity -= 1;
    
    if(item.quantity === 0){
      this.removeOrderItem(item);
    }

    this.globalPrice -= item.price;
  }

  increaseQuantity(item: OrderItem): void {
    item.quantity += 1;

    this.globalPrice += item.price;
  }

  removeOrderItem(item: OrderItem): void {
    for(let i = 0; i < this.orderItems.length; i++) 
      if(this.orderItems[i].itemId === item.itemId) 
        this.orderItems.splice(i, 1);
    this.globalPrice -= item.quantity * item.price;
  }

  increasePriority(item: OrderItem): void {
    if(item.priority == null) item.priority = 1;
    else if(item.priority === 3) item.priority = null;
    else item.priority += 1;
  }

  decreasePriority(item: OrderItem): void {
    if(item.priority == null) item.priority = 3;
    else if(item.priority === 1) item.priority = null;
    else item.priority -= 1;
  }

  private saveInitiallyLoadedOrderItemsAndCalcGlobPrice(): void {
    /* Save initial order items for possible delete        */
    /* Calculate global price based on initial order items */

    for(let orderItem of this.orderItems){
      let oi: OrderItem = {
        id: orderItem.id,
        itemId: orderItem.itemId,
        name: orderItem.name,
        quantity: orderItem.quantity,
        price: orderItem.price,
        priority: orderItem.priority
      }
      this.initiallyLoadedOrderItems.push(oi);
      this.globalPrice += oi.quantity * oi.price;
    }
  }

  private addOrderItemsForDelete(): void {
    /* Call this method before back when update */
    for(let oi of this.initiallyLoadedOrderItems) {
      if(this.orderItemInOrderItemsList(oi)) {
        oi.quantity = 0;
        this.orderItems.push(oi);
      }
    }
  }

  private orderItemInOrderItemsList(oi: OrderItem): boolean {
    return this.orderItems.some(orderItem => orderItem.id === oi.id)
  }
  
  private createOrderCreationDTO(): OrderCreationDTO {
    let orderDTO: OrderCreationDTO = {
      note: this.note,
      tableId: this.tableId,
      waiterId: this.getWaiterId(),
      orderItems: this.orderItems
    };
    return orderDTO;
  }

  private getWaiterId(): number {
    const token = localStorage.getItem("user");
    const jwt: JwtHelperService = new JwtHelperService();

    if(token) {
      const info = jwt.decodeToken(token);
      return info.userId;
    }
    return -1;
  }
}