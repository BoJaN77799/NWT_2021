import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPricesComponent } from './item-prices.component';

describe('ItemPricesComponent', () => {
  let component: ItemPricesComponent;
  let fixture: ComponentFixture<ItemPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
