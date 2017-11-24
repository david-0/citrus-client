import {inject, TestBed} from "@angular/core/testing";

import {FruitSettingsService} from "./fruit-settings.service";

describe("FruitSettingsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FruitSettingsService]
    });
  });

  it("should be created", inject([FruitSettingsService], (service: FruitSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
