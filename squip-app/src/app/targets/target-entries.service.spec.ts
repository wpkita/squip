import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TargetEntriesService } from './target-entries.service';

describe('TargetEntriesService', () => {
  let service: TargetEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],});
    service = TestBed.inject(TargetEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
