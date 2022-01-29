import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputBtnComponent } from './search-input-btn.component';

describe('SearchInputBtnComponent', () => {
  let component: SearchInputBtnComponent;
  let fixture: ComponentFixture<SearchInputBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInputBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
