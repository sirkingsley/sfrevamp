import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntlCountryCodesComponent } from './intl-country-codes.component';

describe('IntlCountryCodesComponent', () => {
  let component: IntlCountryCodesComponent;
  let fixture: ComponentFixture<IntlCountryCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntlCountryCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntlCountryCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
