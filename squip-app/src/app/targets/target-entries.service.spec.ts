import { TestBed } from '@angular/core/testing';

import { TargetEntriesService } from './target-entries.service';

describe('TargetEntriesService', () => {
  let service: TargetEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TargetEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
