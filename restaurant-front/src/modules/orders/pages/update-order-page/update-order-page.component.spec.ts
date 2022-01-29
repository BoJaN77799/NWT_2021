import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderPageComponent } from './update-order-page.component';

describe('UpdateOrderPageComponent', () => {
  let component: UpdateOrderPageComponent;
  let fixture: ComponentFixture<UpdateOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
