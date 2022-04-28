import { TestBed } from '@angular/core/testing';

import { LocalStorageDataProviderService } from './local-storage-data-provider.service';

describe('LocalStorageDataProviderService', () => {
  let service: LocalStorageDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
