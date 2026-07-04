import {TestBed} from '@angular/core/testing';
import {HabitSummariesService} from './habit-summaries.service';

describe('HabitSummarieService', () => {
  let service: HabitSummariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitSummariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
