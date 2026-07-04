import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MoodsService } from './moods.service';

describe('MoodsService', () => {
  let service: MoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],});
    service = TestBed.inject(MoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
