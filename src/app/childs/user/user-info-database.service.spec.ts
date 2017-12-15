import {inject, TestBed} from "@angular/core/testing";

import {UserInfoDatabaseService} from "./user-info-database.service";

describe("UserInfoDatabaseService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoDatabaseService]
    });
  });

  it("should be created", inject([UserInfoDatabaseService], (service: UserInfoDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
