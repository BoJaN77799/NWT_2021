import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { UsersSearchPageComponent } from './pages/users-search-page/users-search-page.component';

export const UsersRoutes: Routes = [
  {
    path: "users-search",
    component: UsersSearchPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "ADMINISTRATOR" },
  }
];
