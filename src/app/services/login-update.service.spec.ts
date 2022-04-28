import { TestBed } from '@angular/core/testing';

import { LoginUpdateService } from './login-update.service';

describe('LoginUpdateService', () => {
  let service: LoginUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
