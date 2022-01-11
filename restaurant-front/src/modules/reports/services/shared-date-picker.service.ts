import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

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
}
