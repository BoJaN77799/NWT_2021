import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";

import { SalesTableComponent } from "./pages/sales-table/sales-table.component";
import { ReportsManagerComponent } from "./pages/reports-manager/reports-manager.component";
import { IncomeExpensesChartComponent } from "./pages/income-expenses-chart/income-expenses-chart.component";
import { SalesChartComponent } from "./pages/sales-chart/sales-chart.component";
import { ActivityTableComponent } from "./pages/activity-table/activity-table.component";
import { ActivityChartComponent } from "./pages/activity-chart/activity-chart.component";


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
          path: "sales-chart",
          component: SalesChartComponent,
        },
        {
          path: "income-expenses-chart",
          component: IncomeExpensesChartComponent,
        },
        {
          path: "activity-table",
          component: ActivityTableComponent,
        },
        {
          path: "activity-chart",
          component: ActivityChartComponent,
        }
      ]
    },    
];
