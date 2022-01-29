import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input-btn',
  templateUrl: './search-input-btn.component.html',
  styleUrls: ['./search-input-btn.component.scss']
})
export class SearchInputBtnComponent {

  searchText: string;

  @Output()
  searchBtnClicked: EventEmitter<string>;

  constructor() {
    this.searchText = "";
    this.searchBtnClicked = new EventEmitter();
  }

  btnClicked(): void {
    this.searchBtnClicked.emit(this.searchText);
  }

}
