import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreatePageComponent } from './item-create-page.component';

describe('ItemCreatePageComponent', () => {
  let component: ItemCreatePageComponent;
  let fixture: ComponentFixture<ItemCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCreatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
