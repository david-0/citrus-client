import { TestBed, inject } from '@angular/core/testing';

import { UnitOfMeasurementDtoRestService } from './unit-of-measurement-dto-rest.service';

describe('UnitOfMeasurementDtoRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitOfMeasurementDtoRestService]
    });
  });

  it('should be created', inject([UnitOfMeasurementDtoRestService], (service: UnitOfMeasurementDtoRestService) => {
    expect(service).toBeTruthy();
  }));
});
