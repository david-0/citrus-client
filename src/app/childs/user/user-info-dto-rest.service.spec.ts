import {inject, TestBed} from "@angular/core/testing";

import {UserInfoDtoRestService} from "./user-info-dto-rest.service";

describe("UserInfoDtoRestService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoDtoRestService]
    });
  });

  it("should be created", inject([UserInfoDtoRestService], (service: UserInfoDtoRestService) => {
    expect(service).toBeTruthy();
  }));
});
