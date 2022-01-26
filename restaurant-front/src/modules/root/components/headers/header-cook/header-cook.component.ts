import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/modules/shared/services/util/util.service';

@Component({
  selector: 'app-header-cook',
  templateUrl: './header-cook.component.html',
  styleUrls: ['./header-cook.component.scss']
})
export class HeaderCookComponent {

  userId: number

  @Input()
  userRole: string;

  constructor(private utilService: UtilService) {
    this.userId = this.utilService.getLoggedUserId();
    this.userRole = ""
  }
}
