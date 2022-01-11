import { TestBed } from '@angular/core/testing';

import { SharedDatePickerService } from './shared-date-picker.service';

describe('SharedDatePickerService', () => {
  let service: SharedDatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDatePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
