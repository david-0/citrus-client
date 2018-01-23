import {ReplaySubject} from "rxjs/ReplaySubject";
import {Session} from "./session";
import createSpy = jasmine.createSpy;
import createSpyObj = jasmine.createSpyObj;

describe("Session", () => {
  let requestSpy;
  let requestSpy2;
  let requestSpy3;
  beforeEach(() => {
    requestSpy = createSpyObj("reqest", {
      toString: createSpy("toString").and.returnValue("session"),
    });
    requestSpy.typeName = "type";
    requestSpy.condition = "condition";

    requestSpy2 = createSpyObj("reqest", {
      toString: createSpy("toString").and.returnValue("session"),
    });
    requestSpy2.typeName = "type";

    requestSpy3 = createSpyObj("reqest", {
      toString: createSpy("toString").and.returnValue("session"),
    });
    requestSpy3.typeName = "type1";
  });

  it("hasSameType", () => {
    const session = new Session(requestSpy, new ReplaySubject());
    expect(session.hasSameType(requestSpy2)).toBeTruthy();
  });

  it("hasSameType is false", () => {
    const session = new Session(requestSpy, new ReplaySubject());
    expect(session.hasSameType(requestSpy3)).toBeFalsy();
  });

  it("isLoaded is false", () => {
    const subject = new ReplaySubject<string[]>();
    const session = new Session(requestSpy, subject);
    expect(session.isLoaded()).toBeFalsy();
  });

  it("isLoaded is true", () => {
    const subject = new ReplaySubject<string[]>();
    const session = new Session(requestSpy, subject);
    subject.next(["ping", "pong"]);
    expect(session.isLoaded()).toBeTruthy();
  });

  it("areAllLoaded is false, when not condition undefined", () => {
    const inputSubject = new ReplaySubject<string[]>();
    const session = new Session(requestSpy, inputSubject);
    session.areAllLoaded().subscribe(loaded => {
      expect(loaded).toBeFalsy();
    });
  });

  it("areAllLoaded is true, when no condition and inputSubject has already data", () => {
    let called = false;
    const inputSubject = new ReplaySubject<string[]>();
    inputSubject.next(["a"]);
    const session = new Session(requestSpy2, inputSubject);
    session.areAllLoaded().subscribe(loaded => {
      expect(loaded).toBeTruthy();
      called = true;
    });
    expect(called).toBeTruthy();
  });

  it("areAllLoaded is true, when no condition and inputSubject get's his data", () => {
    let called = false;
    const inputSubject = new ReplaySubject<string[]>();
    const session = new Session(requestSpy2, inputSubject);
    session.areAllLoaded().subscribe(loaded => {
      expect(loaded).toBeTruthy();
      called = true;
    });
    expect(called).toBeFalsy();
    inputSubject.next(["a"]);
    expect(called).toBeTruthy();
  });

  it("areAllLoaded is false, when no condition and inputSubject has already been completed", () => {
    let called = false;
    const inputSubject = new ReplaySubject<string[]>();
    inputSubject.complete();
    const session = new Session(requestSpy2, inputSubject);
    session.areAllLoaded().subscribe(loaded => {
      expect(loaded).toBeFalsy();
      called = true;
    });
    expect(called).toBeTruthy();
  });

  it("areAllLoaded is false, when no condition and inputSubject will be completed", () => {
    let called = false;
    const inputSubject = new ReplaySubject<string[]>();
    const session = new Session(requestSpy2, inputSubject);
    session.areAllLoaded().subscribe(loaded => {
      expect(loaded).toBeFalsy();
      called = true;
    });
    expect(called).toBeFalsy();
    inputSubject.complete();
    expect(called).toBeTruthy();
  });

  it("areAllLoaded is false, when no condition and inputSubject has already had an error", () => {
    let nextCalled = false;
    let errorCalled = false;
    const inputSubject = new ReplaySubject<string[]>();
    inputSubject.error("error");
    const session = new Session(requestSpy2, inputSubject);
    session.areAllLoaded().subscribe(loaded => {
        nextCalled = true;
      }, error => {
        errorCalled = true;
      }
    );
    expect(nextCalled).toBeFalsy();
    expect(errorCalled).toBeTruthy();
  });

  it("areAllLoaded error, when no condition and inputSubject will receive an error", () => {
    let nextCalled = false;
    let errorCalled = false;
    const inputSubject = new ReplaySubject<string[]>();
    const session = new Session(requestSpy2, inputSubject);
    session.areAllLoaded().subscribe(loaded => {
        nextCalled = true;
      }, error => {
        errorCalled = true;
      }
    );
    expect(errorCalled).toBeFalsy();
    inputSubject.error("error");
    expect(nextCalled).toBeFalsy();
    expect(errorCalled).toBeTruthy();
  });
});
