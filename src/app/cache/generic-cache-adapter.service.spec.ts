import {inject, TestBed} from "@angular/core/testing";

import {GenericCacheAdapterService} from "./generic-cache-adapter.service";

describe("GenericCacheAdapterService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericCacheAdapterService]
    });
  });

//  it("should be created", inject([GenericCacheAdapterService], (service: GenericCacheAdapterService) => {
//    expect(service).toBeTruthy();
//  }));
});
