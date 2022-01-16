import { TestBed } from '@angular/core/testing';

import { DrinkSearchService } from './drink-search.service';

describe('DrinkSearchService', () => {
  let service: DrinkSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinkSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
