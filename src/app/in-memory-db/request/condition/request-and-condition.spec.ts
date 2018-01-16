import {RequestAndCondition} from "./request-and-condition";

describe("RequestAndCondition", () => {
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
    const andCondition = new RequestAndCondition([dummyConditionTrue]);
    expect(andCondition.match({})).toBeTruthy();
  });

  it("should not match, if only one condition and that is false", () => {
    const andCondition = new RequestAndCondition([dummyConditionFalse]);
    expect(andCondition.match({})).toBeFalsy();
  });

  it("should match, if all conditions are true", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue, dummyConditionTrue]);
    expect(andCondition.match({})).toBeTruthy();
  });

  it("should not match, if all conditions are false", () => {
    const andCondition = new RequestAndCondition([dummyConditionFalse, dummyConditionFalse]);
    expect(andCondition.match({})).toBeFalsy();
  });

  it("should not match, if at least one condition is false", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue, dummyConditionFalse]);
    expect(andCondition.match({})).toBeFalsy();
  });


  it("should matchId, if only one condition and that is true", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue]);
    expect(andCondition.matchId(1)).toBeTruthy();
  });

  it("should not matchId, if only one condition and that is false", () => {
    const andCondition = new RequestAndCondition([dummyConditionFalse]);
    expect(andCondition.matchId(1)).toBeFalsy();
  });

  it("should matchId, if all conditions are true", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue, dummyConditionTrue]);
    expect(andCondition.matchId(1)).toBeTruthy();
  });

  it("should not matchId, if all conditions are false", () => {
    const andCondition = new RequestAndCondition([dummyConditionFalse, dummyConditionFalse]);
    expect(andCondition.matchId(1)).toBeFalsy();
  });

  it("should not matchId, if at least one condition is false", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue, dummyConditionFalse]);
    expect(andCondition.matchId(1)).toBeFalsy();
  });


  it("isRangeCondition true, if only one condition and that is true", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue]);
    expect(andCondition.isRangeCondition()).toBeTruthy();
  });

  it("isRangeCondition false, if only one condition and that is false", () => {
    const andCondition = new RequestAndCondition([dummyConditionFalse]);
    expect(andCondition.isRangeCondition()).toBeFalsy();
  });

  it("isRangeCondition true, if all conditions are true", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue, dummyConditionTrue]);
    expect(andCondition.isRangeCondition()).toBeTruthy();
  });

  it("isRangeCondition false, if all conditions are false", () => {
    const andCondition = new RequestAndCondition([dummyConditionFalse, dummyConditionFalse]);
    expect(andCondition.isRangeCondition()).toBeFalsy();
  });

  it("isRangeCondition true, if at least one condition is true", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue, dummyConditionFalse]);
    expect(andCondition.isRangeCondition()).toBeTruthy();
  });


  it("should toString with one condition", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue]);
    expect(andCondition.toString()).toEqual("{AND: {dummyTrue}}");
  });

  it("should toString with multiple condition", () => {
    const andCondition = new RequestAndCondition([dummyConditionTrue, dummyConditionFalse, dummyConditionFalse]);
    expect(andCondition.toString()).toEqual("{AND: {dummyTrue,dummyFalse,dummyFalse}}");
  });

});
