import {ReplaySubject} from "rxjs/ReplaySubject";
import {Sessions} from "./sessions";
import createSpy = jasmine.createSpy;
import createSpyObj = jasmine.createSpyObj;

describe("Sessions", () => {
  let sessionSpy;
  let sessionSpy2;
  let sessionSpyLoaded;
  let inputSubject;
  let sessionSpyNotLoaded;
  let inputSubjectNotLoaded;
  beforeEach(() => {
    sessionSpy = createSpyObj("session", {isLoaded: false});
    sessionSpy.request = createSpyObj("reqest", {
      toString: createSpy("toString").and.returnValue("request"),
    });
    sessionSpy.request.typeName = "type";

    sessionSpy2 = createSpyObj("session2", {isLoaded: false});
    sessionSpy2.request = createSpyObj("reqest2", {
      toString: createSpy("toString").and.returnValue("request2"),
    });
    sessionSpy2.request.typeName = "type2";

    inputSubject = new ReplaySubject<boolean>();
    sessionSpyLoaded = createSpyObj("sessionLoaded", {
      isLoaded: true,
      areAllLoaded: inputSubject,
    });
    sessionSpyLoaded.request = createSpyObj("reqest", {
      toString: createSpy("toString").and.returnValue("request3"),
      isSubRequest: true,
    });
    sessionSpyLoaded.request.typeName = "type";

    inputSubjectNotLoaded = new ReplaySubject<boolean>();
    sessionSpyNotLoaded = createSpyObj("sessionLoaded", {
      isLoaded: false,
      areAllLoaded: inputSubjectNotLoaded,
    });
    sessionSpyNotLoaded.request = createSpyObj("reqest", {
      toString: createSpy("toString").and.returnValue("request3"),
      isSubRequest: true,
    });
    sessionSpyNotLoaded.request.typeName = "type";
  });

  it("has true, if session already added", () => {
    const sessions = new Sessions();
    sessions.add(sessionSpy);
    expect(sessions.has(sessionSpy.request)).toBeTruthy();
  });
  it("has true, if multiple sessions already added", () => {
    const sessions = new Sessions();
    sessions.add(sessionSpy);
    sessions.add(sessionSpy2);
    expect(sessions.has(sessionSpy.request)).toBeTruthy();
    expect(sessions.has(sessionSpy2.request)).toBeTruthy();
  });
  it("has false, if session was nod added", () => {
    const sessions = new Sessions();
    expect(sessions.has(sessionSpy.request)).toBeFalsy();
  });

  it("get should return session, if session already added", () => {
    const sessions = new Sessions();
    sessions.add(sessionSpy);
    expect(sessions.get(sessionSpy.request)).toBe(sessionSpy);
  });
  it("get should return undefined, if session was not added", () => {
    const sessions = new Sessions();
    expect(sessions.get(sessionSpy.request)).toBeUndefined();
  });

  it("getSessionOfType should return an empty array, if no session with typename was added", () => {
    const sessions = new Sessions();
    sessions.add(sessionSpy);
    expect(sessions.getSessionsOfType("type1")).toEqual([]);
  });
  it("getSessionOfType should return session, if session with typename was added", () => {
    const sessions = new Sessions();
    sessions.add(sessionSpy);
    expect(sessions.getSessionsOfType("type")).toEqual([sessionSpy]);
  });
  it("getSessionOfType should return two sessions in order, if two session with typename were added", () => {
    const sessions = new Sessions();
    sessions.add(sessionSpyLoaded);
    sessions.add(sessionSpy);
    expect(sessions.getSessionsOfType("type")).toEqual([sessionSpyLoaded, sessionSpy]);
  });

  it("getParentSession should return undefined, if no parent is available", () => {
    const sessions = new Sessions();
    expect(sessions.getParentSession(sessionSpy.request)).toBeUndefined();
  });
  it("getParentSession should return parent, if parent available", () => {
    const sessions = new Sessions();
    sessions.add(sessionSpyLoaded);
    expect(sessions.getParentSession(sessionSpy.request)).toEqual(sessionSpyLoaded);
  });

  it("areRequestedItemsLoaded should return observable with true, if correct type and all loaded", () => {
    let called = false;
    const sessions = new Sessions();
    sessions.add(sessionSpyLoaded);
    inputSubject.next(true);
    inputSubject.complete();
    sessions.areRequestedItemsLoaded(sessionSpy.request).subscribe(next => {
      expect(next).toBeTruthy();
      called = true;
    });
    expect(called).toBeTruthy();
  });

  it("areRequestedItemsLoaded should return observable with false, if no session of this type", () => {
    let called = false;
    const sessions = new Sessions();
    sessions.areRequestedItemsLoaded(sessionSpy.request).subscribe(next => {
      expect(next).toBeFalsy();
      called = true;
    });
    expect(called).toBeTruthy();
  });

  it("areRequestedItemsLoaded should return observable with false, if correct type and not loaded", () => {
    let called = false;
    const sessions = new Sessions();
    sessions.add(sessionSpyLoaded);
    sessions.areRequestedItemsLoaded(sessionSpy.request).subscribe(next => {
      expect(next).toBeFalsy();
      called = true;
    });
    expect(called).toBeFalsy();
    inputSubject.next(false);
    // waiting until inputSuject is completed, all false must complete
    expect(called).toBeFalsy();
    inputSubject.complete();
    // now, all are completed
    expect(called).toBeTruthy();
  });

  it("areRequestedItemsLoaded should return observable with true, if first true", () => {
    let called = false;
    const sessions = new Sessions();
    sessions.add(sessionSpyLoaded);
    sessions.add(sessionSpyNotLoaded);
    sessions.areRequestedItemsLoaded(sessionSpy.request).subscribe(next => {
      expect(next).toBeTruthy();
      called = true;
    });
    expect(called).toBeFalsy();
    inputSubject.next(true);
    // not waiting until inputSuject is completed, one true is enought
    expect(called).toBeTruthy();
  });
});
