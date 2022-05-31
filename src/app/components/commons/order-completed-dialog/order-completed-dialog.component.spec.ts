import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompletedDialogComponent } from './order-completed-dialog.component';

describe('OrderCompletedDialogComponent', () => {
  let component: OrderCompletedDialogComponent;
  let fixture: ComponentFixture<OrderCompletedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCompletedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCompletedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
