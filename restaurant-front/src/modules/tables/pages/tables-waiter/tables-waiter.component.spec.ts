import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesWaiterComponent } from './tables-waiter.component';

describe('TablesWaiterComponent', () => {
  let component: TablesWaiterComponent;
  let fixture: ComponentFixture<TablesWaiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesWaiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
