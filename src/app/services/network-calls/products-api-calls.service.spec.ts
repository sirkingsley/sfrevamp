import { TestBed } from '@angular/core/testing';

import { ProductsApiCallsService } from './products-api-calls.service';

describe('ProductsApiCallsService', () => {
  let service: ProductsApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
