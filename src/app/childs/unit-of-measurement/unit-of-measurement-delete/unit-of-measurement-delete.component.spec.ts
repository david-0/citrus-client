import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, Params} from "@angular/router";
import {ReplaySubject} from "rxjs";
import {UnitOfMeasurementWithArticlesDtoRestServiceSpy} from "../../../testing-mocks/testing-mocks.component";
import {TestingMocksModule} from "../../../testing-mocks/testing-mocks.module";
import {UnitOfMeasurementWithArticlesDtoRestService} from "../unit-of-measurement-with-articles-dto-rest.service";

import {UnitOfMeasurementDeleteComponent} from "./unit-of-measurement-delete.component";

describe("UnitOfMeasurementDeleteComponent", () => {
  let component: UnitOfMeasurementDeleteComponent;
  let fixture: ComponentFixture<UnitOfMeasurementDeleteComponent>;
  let activatedRouteSpy: any;
  let paramsSubject: ReplaySubject<Params>;

  beforeEach(async(() => {
    paramsSubject = new ReplaySubject<Params>(1);
    paramsSubject.next({id: 1});
    activatedRouteSpy = {params: paramsSubject};
    TestBed.configureTestingModule({
      imports: [TestingMocksModule,
        MatCardModule],
      declarations: [UnitOfMeasurementDeleteComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: UnitOfMeasurementWithArticlesDtoRestService, useClass: UnitOfMeasurementWithArticlesDtoRestServiceSpy},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitOfMeasurementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
