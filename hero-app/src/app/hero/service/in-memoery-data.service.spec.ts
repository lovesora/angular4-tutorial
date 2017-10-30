import { TestBed, inject } from '@angular/core/testing';

import { InMemoeryDataService } from './in-memoery-data.service';

describe('InMemoeryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoeryDataService]
    });
  });

  it('should be created', inject([InMemoeryDataService], (service: InMemoeryDataService) => {
    expect(service).toBeTruthy();
  }));
});
