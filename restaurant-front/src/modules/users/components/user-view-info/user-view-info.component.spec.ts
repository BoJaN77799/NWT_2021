import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewInfoComponent } from './user-view-info.component';

describe('UserViewInfoComponent', () => {
  let component: UserViewInfoComponent;
  let fixture: ComponentFixture<UserViewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
