import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-custom-text',
  templateUrl: './select-custom-text.component.html',
  styleUrls: ['./select-custom-text.component.scss']
})
export class SelectCustomTextComponent implements OnInit {

  @Input()
  options: string[];

  @Input()
  placeholder: string;

  @Input()
  defaultOption: string;  

  @Output()
  optionSelected: EventEmitter<string>;

  constructor() { 
    this.options = [];
    this.placeholder = '';
    this.defaultOption = '';
    this.optionSelected = new EventEmitter();
  }

  optionChanged(event: string):void {
    this.optionSelected.emit(event);
  }

  ngOnInit(): void {}

}
