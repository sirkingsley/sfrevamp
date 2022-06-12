import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPopUpComponent } from './cart-pop-up.component';

describe('CartPopUpComponent', () => {
  let component: CartPopUpComponent;
  let fixture: ComponentFixture<CartPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
