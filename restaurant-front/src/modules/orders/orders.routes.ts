import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { CreateOrderPageComponent } from "./pages/create-order-page/create-order-page.component";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";
import { UpdateOrderPageComponent } from "./pages/update-order-page/update-order-page.component";


export const OrdersRoutes: Routes = [
  {
    path: "orders-page",
    component: OrdersPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "HEAD_COOK|COOK|BARMAN|WAITER" }
  },
  {
    path: "create-order-page/:tableId",
    component: CreateOrderPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "WAITER" }
  },
  {
    path: "update-order-page/:orderId",
    component: UpdateOrderPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "WAITER" }
  }
];