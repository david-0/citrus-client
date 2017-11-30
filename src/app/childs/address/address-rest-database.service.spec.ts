import {inject, TestBed} from "@angular/core/testing";

import {AddressRestDatabaseService} from "./address-rest-database.service";

describe("AddressRestDatabaseService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressRestDatabaseService]
    });
  });

  it("should be created", inject([AddressRestDatabaseService], (service: AddressRestDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
