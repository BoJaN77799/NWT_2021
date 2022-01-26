import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocketService } from 'src/modules/shared/services/socket.service';

@Component({
  selector: 'app-root-layout-page',
  templateUrl: './root-layout-page.component.html',
  styleUrls: ['./root-layout-page.component.scss']
})
export class RootLayoutPageComponent {

  public showFiller: boolean = false;

  public role: string;

  constructor(private socketService: SocketService) {
    this.role = "";
  }

  checkRole() {
    const item = localStorage.getItem("user");

    if (item) {
      const jwt: JwtHelperService = new JwtHelperService();
      this.role = jwt.decodeToken(item).role;
      this.socketService.connect(jwt.decodeToken(item).userId);
    }
  }

}
