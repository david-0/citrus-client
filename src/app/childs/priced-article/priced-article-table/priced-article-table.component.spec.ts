import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricedArticleTableComponent } from './priced-article-table.component';

describe('PricedArticleTableComponent', () => {
  let component: PricedArticleTableComponent;
  let fixture: ComponentFixture<PricedArticleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricedArticleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricedArticleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
