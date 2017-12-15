import {inject, TestBed} from "@angular/core/testing";

import {AddressCacheAdapterService} from "./address-cache-adapter.service";

describe("AddressCacheAdapterService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressCacheAdapterService]
    });
  });

  it("should be created", inject([AddressCacheAdapterService], (service: AddressCacheAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
