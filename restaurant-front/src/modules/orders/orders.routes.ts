import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";

export const OrdersRoutes: Routes = [
  {
    path: "orders-page",
    component: OrdersPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "HEADCOOK|COOK|BARMAN|WAITER" },
  }
];