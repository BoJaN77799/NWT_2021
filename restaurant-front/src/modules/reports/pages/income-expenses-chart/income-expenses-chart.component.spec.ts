import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpensesChartComponent } from './income-expenses-chart.component';

describe('IncomeExpensesChartComponent', () => {
  let component: IncomeExpensesChartComponent;
  let fixture: ComponentFixture<IncomeExpensesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeExpensesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpensesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
