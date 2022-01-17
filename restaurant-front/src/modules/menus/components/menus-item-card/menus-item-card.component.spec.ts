import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusItemCardComponent } from './menus-item-card.component';

describe('MenusItemCardComponent', () => {
  let component: MenusItemCardComponent;
  let fixture: ComponentFixture<MenusItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusItemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
