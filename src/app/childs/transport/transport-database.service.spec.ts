import { TestBed, inject } from '@angular/core/testing';

import { TransportDatabaseService } from './transport-database.service';

describe('TransportDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportDatabaseService]
    });
  });

  it('should be created', inject([TransportDatabaseService], (service: TransportDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
