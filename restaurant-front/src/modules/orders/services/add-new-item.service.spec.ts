import { TestBed } from '@angular/core/testing';

import { AddNewItemService } from './add-new-item.service';

describe('AddNewItemService', () => {
  let service: AddNewItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
