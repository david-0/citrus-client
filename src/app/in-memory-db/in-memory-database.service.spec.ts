import {inject, TestBed} from "@angular/core/testing";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {CacheService} from "./cache/cache-service";

import {InMemoryDatabaseService} from "./in-memory-database.service";
import {ProjectorService} from "./projector/projector.service";
import {Request} from "./request/request";
import {RangeResult} from "./rest/range-result";
import {RequestService} from "./websocket/request.service";
import createSpy = jasmine.createSpy;
import createSpyObj = jasmine.createSpyObj;

describe("InMemoryDatabaseService", () => {

  let requestServiceSpy;
  let observable;

  let requestSpy;
  let subRequestSpy;
  let projectorServiceSpy;
  let projectorSpy;
  let cacheServiceSpy;

  beforeEach(() => {
    observable = new ReplaySubject<RangeResult<any>>();
    requestServiceSpy = createSpyObj<RequestService>("RequestServiceSpy", ["toString"]);
    requestServiceSpy.get = createSpy("get").and.returnValue(observable);

    projectorSpy = createSpyObj<ProjectorService>("DummyProjector", ["toString"]);
    projectorSpy.projectManyAndUpdateCache = createSpy("projectManyAndUpdateCache").and.returnValue(["p1", "p2"]);

    projectorServiceSpy = createSpyObj<ProjectorService>("ProjectorService", ["toString"]);
    projectorServiceSpy.get = createSpy("get").and.returnValue(projectorSpy);

    cacheServiceSpy = createSpyObj<CacheService>("CacheService", ["toString"]);
    cacheServiceSpy.getCache = createSpy("getCache").and.returnValue(null);


    TestBed.configureTestingModule({
      providers: [
        InMemoryDatabaseService,
        {provide: RequestService, useValue: requestServiceSpy},
        {provide: ProjectorService, useValue: projectorServiceSpy},
        {provide: CacheService, useValue: cacheServiceSpy},
      ]
    });

    requestSpy = createRequestSpy();
    subRequestSpy = createSubRequestSpy();
  });

  const createRequestSpy = function (): Request {
    const spy = createSpyObj("reqest", {
      toString: createSpy("toString").and.returnValue("request"),
      isSubRequest: createSpy("isSubrequest").and.returnValue(true),
    });
    spy.typeName = "type";
    return spy;
  };

  const createSubRequestSpy = function (): Request {
    const spy = createSpyObj("reqest", {
      toString: createSpy("toString").and.returnValue("subRequest"),
    });
    spy.typeName = "type";
    spy.condition = "condition";
    return spy;
  };

  it("should be created", inject([InMemoryDatabaseService], (service: InMemoryDatabaseService) => {
    expect(service).toBeTruthy();
  }));

  it("return projected items", inject([InMemoryDatabaseService], (service: InMemoryDatabaseService) => {
    let called = false;
    service.get(requestSpy).subscribe(items => {
      called = true;
      expect(items).toEqual(["p1", "p2"]);
    });
    expect(called).toBeFalsy();
    observable.next(new RangeResult(["s1", "s2"], 2));
    expect(called).toBeTruthy();
  }));

  it("two calls with same request only one call to requestService",
    inject([InMemoryDatabaseService], (service: InMemoryDatabaseService) => {
      let called = 0;
      service.get(requestSpy).subscribe(items => {
        called += 1;
        expect(items).toEqual(["p1", "p2"]);
      });
      service.get(requestSpy).subscribe(items => {
        called += 1;
        expect(items).toEqual(["p1", "p2"]);
      });
      expect(called).toEqual(0);
      observable.next(new RangeResult(["s1", "s2"], 2));
      expect(called).toEqual(2);
      expect(requestServiceSpy.get).toHaveBeenCalledTimes(1);
    }));

  it("two calls with a request and a subrequest, only one call to requestService",
    inject([InMemoryDatabaseService], (service: InMemoryDatabaseService) => {
      let called = 0;
      service.get(requestSpy).subscribe(items => {
        called += 1;
        expect(items).toEqual(["p1", "p2"]);
      });
      service.get(subRequestSpy).subscribe(items => {
        called += 1;
        expect(items).toEqual(["p1", "p2"]);
      });
      expect(called).toEqual(0);
      observable.next(new RangeResult(["s1", "s2"], 2));
      expect(called).toEqual(2);
      expect(requestServiceSpy.get).toHaveBeenCalledTimes(1);
    }));
});
