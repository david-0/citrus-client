import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationOverviewComponent } from './transportation-overview.component';

describe('TransportationOverviewComponent', () => {
  let component: TransportationOverviewComponent;
  let fixture: ComponentFixture<TransportationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
