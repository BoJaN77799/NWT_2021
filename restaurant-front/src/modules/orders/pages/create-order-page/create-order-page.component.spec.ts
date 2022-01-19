import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderPageComponent } from './create-order-page.component';

describe('CreateOrderPageComponent', () => {
  let component: CreateOrderPageComponent;
  let fixture: ComponentFixture<CreateOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
