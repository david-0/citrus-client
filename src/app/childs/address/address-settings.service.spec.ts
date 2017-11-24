import { TestBed, inject } from '@angular/core/testing';

import { AddressSettingsService } from './address-settings.service';

describe('AddressSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressSettingsService]
    });
  });

  it('should be created', inject([AddressSettingsService], (service: AddressSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
