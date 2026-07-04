import {TestBed} from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import {HibitsService} from './hibits.service';

describe('HibitService', () => {
  let service: HibitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],});
    service = TestBed.inject(HibitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
