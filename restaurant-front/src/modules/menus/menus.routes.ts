import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { MenusManagerComponent } from "./pages/menus-manager/menus-manager.component";

export const MenusRoutes: Routes = [
    {
        path: "menus-manager",
        pathMatch: 'prefix',
        component: MenusManagerComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: "MANAGER" },
    }
];