import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitsOverviewComponent } from './fruits-overview.component';

describe('FruitsOverviewComponent', () => {
  let component: FruitsOverviewComponent;
  let fixture: ComponentFixture<FruitsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
