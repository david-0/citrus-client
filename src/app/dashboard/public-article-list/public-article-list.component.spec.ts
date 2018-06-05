import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicArticleListComponent } from './public-article-list.component';

describe('PublicArticleListComponent', () => {
  let component: PublicArticleListComponent;
  let fixture: ComponentFixture<PublicArticleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicArticleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
