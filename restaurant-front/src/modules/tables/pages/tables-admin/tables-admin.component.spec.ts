import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesAdminComponent } from './tables-admin.component';

describe('TablesAdminComponent', () => {
  let component: TablesAdminComponent;
  let fixture: ComponentFixture<TablesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
