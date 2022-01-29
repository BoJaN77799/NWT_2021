import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/modules/shared/services/util/util.service';

@Component({
  selector: 'app-header-barman',
  templateUrl: './header-barman.component.html',
  styleUrls: ['./header-barman.component.scss']
})
export class HeaderBarmanComponent {

  userId: number

  constructor(private utilService: UtilService) {
    this.userId = this.utilService.getLoggedUserId();
  }
}
