import {inject, TestBed} from "@angular/core/testing";

import {AddressCacheService} from "./address-cache.service";

describe("AddressCacheService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressCacheService]
    });
  });

  it("should be created", inject([AddressCacheService], (service: AddressCacheService) => {
    expect(service).toBeTruthy();
  }));
});
