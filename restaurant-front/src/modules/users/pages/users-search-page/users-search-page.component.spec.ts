import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSearchPageComponent } from './users-search-page.component';

describe('UsersSearchPageComponent', () => {
  let component: UsersSearchPageComponent;
  let fixture: ComponentFixture<UsersSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
