import {inject, TestBed} from "@angular/core/testing";

import {InMemoryDatabaseService} from "./in-memory-database.service";

describe("InMemoryDatabaseService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDatabaseService]
    });
  });

  it("should be created", inject([InMemoryDatabaseService], (service: InMemoryDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
