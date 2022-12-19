import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerBalanceDrawerComponent } from './ledger-balance-drawer.component';

describe('LedgerBalanceDrawerComponent', () => {
  let component: LedgerBalanceDrawerComponent;
  let fixture: ComponentFixture<LedgerBalanceDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerBalanceDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LedgerBalanceDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
