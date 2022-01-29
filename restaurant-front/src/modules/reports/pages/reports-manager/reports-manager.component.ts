import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedDatePickerService } from '../../services/shared-date-picker.service';

@Component({
  selector: 'app-reports-manager',
  templateUrl: './reports-manager.component.html',
  styleUrls: ['./reports-manager.component.scss']
})
export class ReportsManagerComponent {

  public range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  
  constructor(private sharedDatePickerService: SharedDatePickerService) {
    this.sharedDatePickerService.getData()
        .subscribe(res => this.range = res);
  }

  public changeDate(): void {  
    this.sharedDatePickerService.addDate(this.range);
  }
 
}
