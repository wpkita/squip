import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CheckInsService } from './check-ins.service';

describe('CheckInsService', () => {
  let service: CheckInsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],});
    service = TestBed.inject(CheckInsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
