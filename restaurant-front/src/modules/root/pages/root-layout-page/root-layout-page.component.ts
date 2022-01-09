import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root-layout-page',
  templateUrl: './root-layout-page.component.html',
  styleUrls: ['./root-layout-page.component.scss']
})
export class RootLayoutPageComponent implements OnInit {

  public showFiller : boolean = false;

  constructor() {
  }
 
  ngOnInit(): void {
  }

}
