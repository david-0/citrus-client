import { TestBed, inject } from '@angular/core/testing';

import { ArticleDtoWithPriceRestService } from './article-dto-with-price-rest.service';

describe('ArticleDtoWithPriceRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleDtoWithPriceRestService]
    });
  });

  it('should be created', inject([ArticleDtoWithPriceRestService], (service: ArticleDtoWithPriceRestService) => {
    expect(service).toBeTruthy();
  }));
});
