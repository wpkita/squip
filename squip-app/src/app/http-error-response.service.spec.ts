import { TestBed } from '@angular/core/testing';

import { HttpErrorResponseService } from './http-error-response.service';

describe('HttpErrorResponseService', () => {
  let service: HttpErrorResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
