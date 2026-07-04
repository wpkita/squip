import {TestBed} from '@angular/core/testing';

import {HibitsService} from './hibits.service';

describe('HibitService', () => {
  let service: HibitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HibitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
