import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UtilService } from "src/modules/shared/services/util/util.service";
import { AuthService } from "../../services/auth-service/auth.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, public utilsService: UtilService) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      let role = this.utilsService.getLoggedUserRole();
      if (role === "ADMINISTRATOR") {
        this.router.navigate(["rest-app/tables/tables-admin"]);
      }
      else if (role === "MANAGER") {
        this.router.navigate(["rest-app/employees/employees-manager"]);
      }
      else if (role === "COOK") {
        this.router.navigate(["rest-app/orders/orders-page"]);
      }
      else if (role === "HEAD_COOK") {
        this.router.navigate(["rest-app/orders/orders-page"]);
      }
      else if (role === "BARMAN") {
        this.router.navigate(["rest-app/orders/orders-page"]);
      }
      else if (role === "WAITER") {
        this.router.navigate(["rest-app/tables/tables-waiter"]);
      }
      return false;
    }
    return true;
  }
}
