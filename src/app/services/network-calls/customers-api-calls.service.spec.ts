import { TestBed } from '@angular/core/testing';

import { CustomersApiCallsService } from './customers-api-calls.service';

describe('CustomersApiCallsService', () => {
  let service: CustomersApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
