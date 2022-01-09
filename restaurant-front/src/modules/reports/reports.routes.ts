import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { SalesTableComponent } from "./pages/sales-table/sales-table.component";
import { ReportsManagerComponent } from "./pages/reports-manager/reports-manager.component";


export const ReportsRoutes: Routes = [
    {
      path: "reports-manager",
      pathMatch: 'prefix',
      component: ReportsManagerComponent,
      canActivate: [RoleGuard],
      data: { expectedRoles: "MANAGER" },
      children: [
        {
          path: "sales-table",
          component: SalesTableComponent,
        }
      ]
    },    
];
