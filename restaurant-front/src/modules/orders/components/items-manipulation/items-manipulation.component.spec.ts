import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsManipulationComponent } from './items-manipulation.component';

describe('ItemsManipulationComponent', () => {
  let component: ItemsManipulationComponent;
  let fixture: ComponentFixture<ItemsManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsManipulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
