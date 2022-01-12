import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCookComponent } from './header-cook.component';

describe('HeaderCookComponent', () => {
  let component: HeaderCookComponent;
  let fixture: ComponentFixture<HeaderCookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
