import { TestBed } from '@angular/core/testing';

import { OrderApiCallsService } from './order-api-calls.service';

describe('OrderApiCallsService', () => {
  let service: OrderApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
