import { TestBed } from '@angular/core/testing';

import { ShopApiCallsService } from './shop-api-calls.service';

describe('ShopApiCallsService', () => {
  let service: ShopApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
