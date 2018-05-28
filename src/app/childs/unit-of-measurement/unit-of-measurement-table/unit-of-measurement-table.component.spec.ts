import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfMeasurementTableComponent } from './unit-of-measurement-table.component';

describe('UnitOfMeasurementTableComponent', () => {
  let component: UnitOfMeasurementTableComponent;
  let fixture: ComponentFixture<UnitOfMeasurementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOfMeasurementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasurementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
