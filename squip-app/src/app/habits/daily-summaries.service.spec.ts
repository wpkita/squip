import {TestBed} from '@angular/core/testing';
import {DailySummariesService} from './daily-summaries.service';

describe('DailySummarieService', () => {
  let service: DailySummariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailySummariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
