import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RootLayoutPageComponent } from './pages/root-layout-page/root-layout-page.component';

const routes: Routes = [
  {
    path: "rest-app",
    component: RootLayoutPageComponent,
    children: [
      {
        path: "tables",
        loadChildren: () =>
          import("./../tables/tables.module").then((m) => m.TablesModule),
      },
      {
        path: "auth",
        loadChildren: () =>
          import("./../auth/auth.module").then((m) => m.AuthModule),
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./../reports/reports.module").then((m) => m.ReportsModule),
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./../orders/orders.module").then((m) => m.OrdersModule),
      },
      {
        path: "employees",
        loadChildren: () =>
          import("./../employees/employees.module").then((m) => m.EmployeesModule),
      },
      {
        path: "items",
        loadChildren: () =>
          import("./../items/items.module").then((m) => m.ItemsModule),
      },
    ],
  },
  {
    path: "",
    redirectTo: "rest-app/auth/login",
    pathMatch: "full",
  },
  { path: "**", component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
