import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, Params} from "@angular/router";
import {ReplaySubject} from "rxjs";
import {UnitOfMeasurementDtoRestServiceSpy} from "../../../testing-mocks/testing-mocks.component";
import {TestingMocksModule} from "../../../testing-mocks/testing-mocks.module";
import {UnitOfMeasurementDtoRestService} from "../unit-of-measurement-dto-rest.service";

import {UnitOfMeasurementDetailsComponent} from "./unit-of-measurement-details.component";

describe("UnitOfMeasurementDetailsComponent", () => {
  let component: UnitOfMeasurementDetailsComponent;
  let fixture: ComponentFixture<UnitOfMeasurementDetailsComponent>;
  let activatedRouteSpy: any;
  let paramsSubject: ReplaySubject<Params>;

  beforeEach(waitForAsync(() => {
    paramsSubject = new ReplaySubject<Params>(1);
    paramsSubject.next({id: 1});
    activatedRouteSpy = {params: paramsSubject};

    TestBed.configureTestingModule({
      imports: [TestingMocksModule,
        MatCardModule],
      declarations: [UnitOfMeasurementDetailsComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: UnitOfMeasurementDtoRestService, useClass: UnitOfMeasurementDtoRestServiceSpy},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasurementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
