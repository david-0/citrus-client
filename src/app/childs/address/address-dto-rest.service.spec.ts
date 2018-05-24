import { TestBed, inject } from '@angular/core/testing';

import { AddressDtoRestService } from './address-dto-rest.service';

describe('AddressDtoRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressDtoRestService]
    });
  });

  it('should be created', inject([AddressDtoRestService], (service: AddressDtoRestService) => {
    expect(service).toBeTruthy();
  }));
});
