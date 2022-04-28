import { TestBed } from '@angular/core/testing';

import { ConstantValuesService } from './constant-values.service';

describe('ConstantValuesService', () => {
  let service: ConstantValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstantValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
