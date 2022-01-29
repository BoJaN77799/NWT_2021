import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";

import { EmployeesViewComponent } from "./pages/employees-view/employees-view.component";

export const EmployeesRoutes: Routes = [
    {
        path: "employees-manager",
        pathMatch: 'prefix',
        component: EmployeesViewComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: "MANAGER" },
    }
];