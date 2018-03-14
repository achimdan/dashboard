import { TestBed, inject } from '@angular/core/testing';

import { ContentServiceService } from './content-service.service';

describe('ContentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentServiceService]
    });
  });

  it('should be created', inject([ContentServiceService], (service: ContentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
