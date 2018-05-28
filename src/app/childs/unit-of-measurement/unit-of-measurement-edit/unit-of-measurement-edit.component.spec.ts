import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfMeasurementEditComponent } from './unit-of-measurement-edit.component';

describe('UnitOfMeasurementEditComponent', () => {
  let component: UnitOfMeasurementEditComponent;
  let fixture: ComponentFixture<UnitOfMeasurementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitOfMeasurementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasurementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
