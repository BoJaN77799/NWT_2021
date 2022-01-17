import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMenuDialogComponent } from './update-menu-dialog.component';

describe('UpdateMenuDialogComponent', () => {
  let component: UpdateMenuDialogComponent;
  let fixture: ComponentFixture<UpdateMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMenuDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
