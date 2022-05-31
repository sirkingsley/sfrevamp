import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderPaymentDialogComponent } from './confirm-order-payment-dialog.component';

describe('ConfirmOrderPaymentDialogComponent', () => {
  let component: ConfirmOrderPaymentDialogComponent;
  let fixture: ComponentFixture<ConfirmOrderPaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOrderPaymentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrderPaymentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
