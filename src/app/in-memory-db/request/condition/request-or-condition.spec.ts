import {RequestOrCondition} from "./request-or-condition";

describe("RequestOrCondition", () => {
  let dummyConditionTrue;
  let dummyConditionFalse;
  beforeEach(() => {
    dummyConditionTrue = {
      "match": obj => true,
      "matchId": id => true,
      "isRangeCondition": () => true,
      "toString": () => "dummyTrue"
    };
    dummyConditionFalse = {
      "match": obj => false,
      "matchId": id => false,
      "isRangeCondition": () => false,
      "toString": () => "dummyFalse",
    };
  });

  it("should match, if only one condition and that is true", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue]);
    expect(orCondition.match({})).toBeTruthy();
  });

  it("should not match, if only one condition and that is false", () => {
    const orCondition = new RequestOrCondition([dummyConditionFalse]);
    expect(orCondition.match({})).toBeFalsy();
  });

  it("should match, if all conditions are true", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue, dummyConditionTrue]);
    expect(orCondition.match({})).toBeTruthy();
  });

  it("should not match, if all conditions are false", () => {
    const orCondition = new RequestOrCondition([dummyConditionFalse, dummyConditionFalse]);
    expect(orCondition.match({})).toBeFalsy();
  });

  it("should match, if at least one condition is true", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue, dummyConditionFalse]);
    expect(orCondition.match({})).toBeTruthy();
  });


  it("should matchId, if only one condition and that is true", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue]);
    expect(orCondition.matchId(1)).toBeTruthy();
  });

  it("should not matchId, if only one condition and that is false", () => {
    const orCondition = new RequestOrCondition([dummyConditionFalse]);
    expect(orCondition.matchId(1)).toBeFalsy();
  });

  it("should matchId, if all conditions are true", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue, dummyConditionTrue]);
    expect(orCondition.matchId(1)).toBeTruthy();
  });

  it("should not matchId, if all conditions are false", () => {
    const orCondition = new RequestOrCondition([dummyConditionFalse, dummyConditionFalse]);
    expect(orCondition.matchId(1)).toBeFalsy();
  });

  it("should matchId, if at least one condition is true", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue, dummyConditionFalse]);
    expect(orCondition.matchId(1)).toBeTruthy();
  });


  it("isRangeCondition true, if only one condition and that is true", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue]);
    expect(orCondition.isRangeCondition()).toBeTruthy();
  });

  it("isRangeCondition false, if only one condition and that is false", () => {
    const orCondition = new RequestOrCondition([dummyConditionFalse]);
    expect(orCondition.isRangeCondition()).toBeFalsy();
  });

  it("isRangeCondition true, if all conditions are true", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue, dummyConditionTrue]);
    expect(orCondition.isRangeCondition()).toBeTruthy();
  });

  it("isRangeCondition false, if all conditions are false", () => {
    const orCondition = new RequestOrCondition([dummyConditionFalse, dummyConditionFalse]);
    expect(orCondition.isRangeCondition()).toBeFalsy();
  });

  it("isRangeCondition true, if at least one condition is true", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue, dummyConditionFalse]);
    expect(orCondition.isRangeCondition()).toBeTruthy();
  });


  it("should toString with one condition", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue]);
    expect(orCondition.toString()).toEqual("{OR: {dummyTrue}}");
  });

  it("should toString with multiple condition", () => {
    const orCondition = new RequestOrCondition([dummyConditionTrue, dummyConditionFalse, dummyConditionFalse]);
    expect(orCondition.toString()).toEqual("{OR: {dummyTrue,dummyFalse,dummyFalse}}");
  });

});
