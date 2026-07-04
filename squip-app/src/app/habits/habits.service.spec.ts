import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {HabitsService} from './habits.service';

describe('HabitsService', () => {
  let service: HabitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(HabitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
