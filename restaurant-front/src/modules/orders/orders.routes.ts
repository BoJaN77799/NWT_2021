import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";
import { CreateOrderPageComponent } from "./pages/create-order-page/create-order-page.component";

export const OrdersRoutes: Routes = [
  {
    path: "orders-page",
    component: OrdersPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "HEADCOOK|COOK|BARMAN|WAITER" },
  },
  {
    path: "create-order-page/:tableId",
    component: CreateOrderPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "WAITER" },
  }
];