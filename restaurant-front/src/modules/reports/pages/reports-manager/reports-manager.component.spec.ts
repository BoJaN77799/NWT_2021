import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsManagerComponent } from './reports-manager.component';

describe('ReportsManagerComponent', () => {
  let component: ReportsManagerComponent;
  let fixture: ComponentFixture<ReportsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
