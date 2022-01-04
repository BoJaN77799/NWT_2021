import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/pages/login/login.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RootLayoutPageComponent } from './pages/root-layout-page/root-layout-page.component';

const routes: Routes = [
  {
    path: "rest-app",
    component: RootLayoutPageComponent,
    children: [
      // {
      //   path: "tables",
      //   loadChildren: () =>
      //     import("./../wine/wine.module").then((m) => m.WineModule),
      // },
      {
        path: "auth",
        loadChildren: () =>
          import("./../auth/auth.module").then((m) => m.AuthModule),
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
