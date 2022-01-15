import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { DrinkCreateComponent } from "./components/drink-create/drink-create.component";
import { FoodCreateComponent } from "./components/food-create/food-create.component";
import { ItemCreatePageComponent } from "./pages/item-create-page/item-create-page.component";

export const ItemsRoutes: Routes = [
  {
    path: "items-page",
    component: ItemCreatePageComponent,
    canActivate: [RoleGuard],
    data: { expectedRoles: "HEAD_COOK|BARMAN" },
    children: [
      {
        path: "food-create",
        component: FoodCreateComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: "HEAD_COOK" },
      },
      {
        path: "drink-create",
        component: DrinkCreateComponent,
        canActivate: [RoleGuard],
        data: { expectedRoles: "BARMAN" },
      }
    ]
  }
];