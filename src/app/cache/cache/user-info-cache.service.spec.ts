import {inject, TestBed} from "@angular/core/testing";

import {UserInfoCacheService} from "./user-info-cache.service";

describe("UserInfoCacheService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoCacheService]
    });
  });

  it("should be created", inject([UserInfoCacheService], (service: UserInfoCacheService) => {
    expect(service).toBeTruthy();
  }));
});
