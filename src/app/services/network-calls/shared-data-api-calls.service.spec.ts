import { TestBed } from '@angular/core/testing';

import { SharedDataApiCallsService } from './shared-data-api-calls.service';

describe('SharedDataApiCallsService', () => {
  let service: SharedDataApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
