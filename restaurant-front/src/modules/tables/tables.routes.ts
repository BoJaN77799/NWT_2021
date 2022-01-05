import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { TablesAdminComponent } from "./pages/tables-admin/tables-admin.component";

export const TablesRoutes: Routes = [
  {
    path: "tables-admin",
    pathMatch: "full",
    component: TablesAdminComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ADMINISTRATOR" },
  }
];