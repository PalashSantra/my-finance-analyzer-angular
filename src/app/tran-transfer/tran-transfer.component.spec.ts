import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranTransferComponent } from './tran-transfer.component';

describe('TranTransferComponent', () => {
  let component: TranTransferComponent;
  let fixture: ComponentFixture<TranTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
