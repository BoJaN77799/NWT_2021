import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusBarComponent } from './menus-bar.component';

describe('MenusBarComponent', () => {
  let component: MenusBarComponent;
  let fixture: ComponentFixture<MenusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
