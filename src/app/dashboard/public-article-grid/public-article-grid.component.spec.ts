import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicArticleGridComponent } from './public-article-grid.component';

describe('PublicArticleGridComponent', () => {
  let component: PublicArticleGridComponent;
  let fixture: ComponentFixture<PublicArticleGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicArticleGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicArticleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
