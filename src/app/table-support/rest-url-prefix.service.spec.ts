import { TestBed, inject } from '@angular/core/testing';

import { RestUrlPrefixService } from './rest-url-prefix.service';

describe('RestUrlPrefixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestUrlPrefixService]
    });
  });

  it('should be created', inject([RestUrlPrefixService], (service: RestUrlPrefixService) => {
    expect(service).toBeTruthy();
  }));
});
