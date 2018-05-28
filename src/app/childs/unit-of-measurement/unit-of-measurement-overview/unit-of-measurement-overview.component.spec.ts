import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfMeasurementOverviewComponent } from './unit-of-measurement-overview.component';

describe('UnitOfMeasurementOverviewComponent', () => {
  let component: UnitOfMeasurementOverviewComponent;
  let fixture: ComponentFixture<UnitOfMeasurementOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOfMeasurementOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasurementOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
