import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { TablesAdminComponent } from "./pages/tables-admin/tables-admin.component";
import { TablesWaiterComponent } from "./pages/tables-waiter/tables-waiter.component";

export const TablesRoutes: Routes = [
  {
    path: "tables-admin",
    pathMatch: "full",
    component: TablesAdminComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ADMINISTRATOR" },
  },
  {
    path: "tables-waiter",
    pathMatch: "full",
    component: TablesWaiterComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "WAITER" },
  }
];