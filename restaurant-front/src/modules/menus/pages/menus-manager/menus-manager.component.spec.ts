import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusManagerComponent } from './menus-manager.component';

describe('MenusManagerComponent', () => {
  let component: MenusManagerComponent;
  let fixture: ComponentFixture<MenusManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
