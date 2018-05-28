import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfMeasurementDetailsComponent } from './unit-of-measurement-details.component';

describe('UnitOfMeasurementDetailsComponent', () => {
  let component: UnitOfMeasurementDetailsComponent;
  let fixture: ComponentFixture<UnitOfMeasurementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOfMeasurementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasurementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
