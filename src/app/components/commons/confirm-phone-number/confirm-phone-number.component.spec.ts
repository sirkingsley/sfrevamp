import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPhoneNumberComponent } from './confirm-phone-number.component';

describe('ConfirmPhoneNumberComponent', () => {
  let component: ConfirmPhoneNumberComponent;
  let fixture: ComponentFixture<ConfirmPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPhoneNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
