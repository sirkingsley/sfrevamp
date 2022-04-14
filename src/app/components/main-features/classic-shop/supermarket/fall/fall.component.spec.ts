import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallComponent } from './fall.component';

describe('FallComponent', () => {
  let component: FallComponent;
  let fixture: ComponentFixture<FallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
