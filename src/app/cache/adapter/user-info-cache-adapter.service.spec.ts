import { TestBed, inject } from '@angular/core/testing';

import { UserInfoCacheAdapterService } from './user-info-cache-adapter.service';

describe('UserInfoCacheAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoCacheAdapterService]
    });
  });

  it('should be created', inject([UserInfoCacheAdapterService], (service: UserInfoCacheAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
