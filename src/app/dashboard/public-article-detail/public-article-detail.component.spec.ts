import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicArticleDetailComponent } from './public-article-detail.component';

describe('PublicArticleDetailComponent', () => {
  let component: PublicArticleDetailComponent;
  let fixture: ComponentFixture<PublicArticleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicArticleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
