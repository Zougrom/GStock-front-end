import { TestBed } from '@angular/core/testing';

import { EntetiesServiceService } from './enteties-service.service';

describe('EntetiesServiceService', () => {
  let service: EntetiesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntetiesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
