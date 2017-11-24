import {inject, TestBed} from "@angular/core/testing";

import {TransportSettingsService} from "./transport-settings.service";

describe("TransportSettingsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportSettingsService]
    });
  });

  it("should be created", inject([TransportSettingsService], (service: TransportSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
