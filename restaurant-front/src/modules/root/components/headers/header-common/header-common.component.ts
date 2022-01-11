import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/modules/auth/services/auth-service/auth.service';

@Component({
  selector: 'app-header-common',
  templateUrl: './header-common.component.html',
  styleUrls: ['./header-common.component.scss']
})
export class HeaderCommonComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["rest-app/auth/login"]);
  }
  
}
