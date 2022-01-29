import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemAddDialogComponent } from './menu-item-add-dialog.component';

describe('MenuItemAddDialogComponent', () => {
  let component: MenuItemAddDialogComponent;
  let fixture: ComponentFixture<MenuItemAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
