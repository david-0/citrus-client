import {inject, TestBed} from "@angular/core/testing";

import {UserDetailsSettingsService} from "./user-info-settings.service";

describe("UserInfoSettingsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDetailsSettingsService]
    });
  });

  it("should be created", inject([UserDetailsSettingsService], (service: UserDetailsSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
