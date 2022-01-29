import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SharedDatePickerService {

  private rangeSource = new Subject<FormGroup>();

  constructor() { }

  addDate(data: FormGroup) : void {
    this.rangeSource.next(data);
  }

  getData() : Observable<FormGroup> {
    return this.rangeSource.asObservable();
  }

  checkDate(date: string) : string {
    var dateString = moment(date).format('DD.MM.YYYY.');
    return dateString.toString();
  }
}
