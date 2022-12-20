import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerBalanceChartComponent } from './ledger-balance-chart.component';

describe('LedgerBalanceChartComponent', () => {
  let component: LedgerBalanceChartComponent;
  let fixture: ComponentFixture<LedgerBalanceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerBalanceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
