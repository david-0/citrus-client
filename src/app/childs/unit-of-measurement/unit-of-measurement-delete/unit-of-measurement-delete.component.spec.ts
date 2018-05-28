import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfMeasurementDeleteComponent } from './unit-of-measurement-delete.component';

describe('UnitOfMeasurementDeleteComponent', () => {
  let component: UnitOfMeasurementDeleteComponent;
  let fixture: ComponentFixture<UnitOfMeasurementDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOfMeasurementDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasurementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
