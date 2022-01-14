import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberDialogComponent } from './number-dialog.component';

describe('NumberDialogComponent', () => {
  let component: NumberDialogComponent;
  let fixture: ComponentFixture<NumberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
