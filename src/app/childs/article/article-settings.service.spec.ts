import { TestBed, inject } from '@angular/core/testing';

import { ArticleSettingsService } from './article-settings.service';

describe('ArticleSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleSettingsService]
    });
  });

  it('should be created', inject([ArticleSettingsService], (service: ArticleSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
