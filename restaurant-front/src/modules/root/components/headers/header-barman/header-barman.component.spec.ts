import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarmanComponent } from './header-barman.component';

describe('HeaderBarmanComponent', () => {
  let component: HeaderBarmanComponent;
  let fixture: ComponentFixture<HeaderBarmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBarmanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBarmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
