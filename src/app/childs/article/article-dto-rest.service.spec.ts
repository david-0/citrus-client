import {inject, TestBed} from "@angular/core/testing";

import {ArticleDtoRestService} from "./article-dto-rest.service";

describe("ArticleDtoRestService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleDtoRestService]
    });
  });

  it("should be created", inject([ArticleDtoRestService], (service: ArticleDtoRestService) => {
    expect(service).toBeTruthy();
  }));
});
