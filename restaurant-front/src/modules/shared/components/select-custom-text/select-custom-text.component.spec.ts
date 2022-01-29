import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCustomTextComponent } from './select-custom-text.component';

describe('SelectCustomTextComponent', () => {
  let component: SelectCustomTextComponent;
  let fixture: ComponentFixture<SelectCustomTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCustomTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCustomTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
