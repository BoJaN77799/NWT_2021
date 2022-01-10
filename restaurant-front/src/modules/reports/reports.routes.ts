import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { SalesTableComponent } from "./pages/sales-table/sales-table.component";
import { ReportsManagerComponent } from "./pages/reports-manager/reports-manager.component";
import { IncomeExpensesChartComponent } from "./pages/income-expenses-chart/income-expenses-chart.component";


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
        },
        {
          path: "income-expenses-chart",
          component: IncomeExpensesChartComponent,
        }
      ]
    },    
];
