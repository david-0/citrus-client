import {inject, TestBed} from "@angular/core/testing";

import {AddressDatabaseService} from "./address-database.service";

describe("AddressDatabaseService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddressDatabaseService]
    });
  });

  it("should be created", inject([AddressDatabaseService], (service: AddressDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
