import {inject, TestBed} from "@angular/core/testing";

import {TransportDatabaseService} from "../transport/transport-database.service";
import {FruitDatabaseService} from "./fruit-database.service";

describe("FruitDatabaseService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportDatabaseService]
    });
  });

  it("should be created", inject([FruitDatabaseService], (service: FruitDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
