import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MatCardModule} from "@angular/material";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {TestingMocksModule} from "../../../testing-mocks/testing-mocks.module";
import {UnitOfMeasurementDtoRestService} from "../unit-of-measurement-dto-rest.service";

import {UnitOfMeasurementDetailsComponent} from "./unit-of-measurement-details.component";

describe("UnitOfMeasurementDetailsComponent", () => {
  let component: UnitOfMeasurementDetailsComponent;
  let fixture: ComponentFixture<UnitOfMeasurementDetailsComponent>;
  let activatedRouteSpy: any;
  let paramsSubject: ReplaySubject<Params>;
  let unitRestSpy: UnitOfMeasurementDtoRestService;

  beforeEach(async(() => {
    paramsSubject = new ReplaySubject<Params>(1);
    paramsSubject.next({id: 1});

    activatedRouteSpy = {params: paramsSubject};
    unitRestSpy = jasmine.createSpyObj<UnitOfMeasurementDtoRestService>("UnitOfMeasurementDtoRestService", ["get"]);
    (<jasmine.Spy>unitRestSpy.get).and.returnValue(Observable.create(observer => {
      observer.next({
        shortcut: "kg",
        description: "Kilogramm",
        articleIds: [],
      });
    }));

    TestBed.configureTestingModule({
      imports: [TestingMocksModule,
        MatCardModule],
      declarations: [UnitOfMeasurementDetailsComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: UnitOfMeasurementDtoRestService, useValue: unitRestSpy},
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
