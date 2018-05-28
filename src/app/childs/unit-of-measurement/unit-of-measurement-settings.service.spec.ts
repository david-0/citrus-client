import { TestBed, inject } from '@angular/core/testing';

import { UnitOfMeasurementSettingsService } from './unit-of-measurement-settings.service';

describe('UnitOfMeasurementSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitOfMeasurementSettingsService]
    });
  });

  it('should be created', inject([UnitOfMeasurementSettingsService], (service: UnitOfMeasurementSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
