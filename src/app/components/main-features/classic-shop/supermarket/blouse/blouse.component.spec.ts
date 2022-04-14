import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlouseComponent } from './blouse.component';

describe('BlouseComponent', () => {
  let component: BlouseComponent;
  let fixture: ComponentFixture<BlouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
