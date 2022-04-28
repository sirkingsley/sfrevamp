import { TestBed } from '@angular/core/testing';

import { DbaseUpdateService } from './dbase-update.service';

describe('DbaseUpdateService', () => {
  let service: DbaseUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbaseUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
