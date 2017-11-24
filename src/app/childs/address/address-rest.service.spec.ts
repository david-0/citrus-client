import { TestBed, inject } from '@angular/core/testing';

import { AddressRestService } from './address-rest.service';

describe('AddressRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressRestService]
    });
  });

  it('should be created', inject([AddressRestService], (service: AddressRestService) => {
    expect(service).toBeTruthy();
  }));
});
