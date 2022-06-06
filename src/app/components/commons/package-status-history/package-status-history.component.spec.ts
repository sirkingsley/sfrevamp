import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageStatusHistoryComponent } from './package-status-history.component';

describe('PackageStatusHistoryComponent', () => {
  let component: PackageStatusHistoryComponent;
  let fixture: ComponentFixture<PackageStatusHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageStatusHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageStatusHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
