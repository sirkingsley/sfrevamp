import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBannerComponent } from './section-banner.component';

describe('SectionBannerComponent', () => {
  let component: SectionBannerComponent;
  let fixture: ComponentFixture<SectionBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
