import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { HttpErrorResponseService } from './http-error-response.service';

describe('HttpErrorResponseService', () => {
  let service: HttpErrorResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],});
    service = TestBed.inject(HttpErrorResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
