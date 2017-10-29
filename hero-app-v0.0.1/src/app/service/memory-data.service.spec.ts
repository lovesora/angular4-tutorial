import { TestBed, inject } from '@angular/core/testing';

import { MemoryDataService } from './memory-data.service';

describe('MemoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryDataService]
    });
  });

  it('should be created', inject([MemoryDataService], (service: MemoryDataService) => {
    expect(service).toBeTruthy();
  }));
});
