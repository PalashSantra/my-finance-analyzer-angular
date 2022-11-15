import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranEntryComponent } from './tran-entry.component';

describe('TranEntryComponent', () => {
  let component: TranEntryComponent;
  let fixture: ComponentFixture<TranEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
