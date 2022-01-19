import { TestBed } from '@angular/core/testing';

import { MenuNamesService } from './menu-names.service';

describe('MenuNamesService', () => {
  let service: MenuNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
