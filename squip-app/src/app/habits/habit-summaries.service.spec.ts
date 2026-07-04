import {TestBed} from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {HabitSummariesService} from './habit-summaries.service';

describe('HabitSummarieService', () => {
  let service: HabitSummariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],});
    service = TestBed.inject(HabitSummariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
