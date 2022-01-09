import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  
  constructor() { }

  ngOnInit(): void {
  }

}
