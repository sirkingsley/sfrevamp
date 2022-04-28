import { TestBed } from '@angular/core/testing';

import { GetHostnameService } from './get-hostname.service';

describe('GetHostnameService', () => {
  let service: GetHostnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHostnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
