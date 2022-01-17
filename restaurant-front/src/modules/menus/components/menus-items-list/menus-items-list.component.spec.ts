import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusItemsListComponent } from './menus-items-list.component';

describe('MenusItemsListComponent', () => {
  let component: MenusItemsListComponent;
  let fixture: ComponentFixture<MenusItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
