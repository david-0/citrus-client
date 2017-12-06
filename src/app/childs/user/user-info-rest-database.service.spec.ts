import {inject, TestBed} from "@angular/core/testing";

import {UserInfoRestDatabaseService} from "./user-info-rest-database.service";

describe("UserInfoRestDatabaseService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoRestDatabaseService]
    });
  });

  it("should be created", inject([UserInfoRestDatabaseService], (service: UserInfoRestDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
