import {inject, TestBed} from "@angular/core/testing";

import {TransportDatabaseService} from "./transport-database.service";

describe("FruitDatabaseService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportDatabaseService]
    });
  });

  it("should be created", inject([TransportDatabaseService], (service: TransportDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
