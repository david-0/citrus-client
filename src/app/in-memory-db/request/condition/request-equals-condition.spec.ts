import {RequestEqualsCondition} from "./request-equals-condition";

describe("RequestEqualsCondition", () => {
  const objWithAttr1 = {};
  beforeEach(() => {
    Object.defineProperty(objWithAttr1, "attr1", {
      get: function () {
        return "val1";
      },
    });
    Object.defineProperty(objWithAttr1, "id", {
      get: function () {
        return 92;
      },
    });
  });

  it("shoud match, if item has the defined attribute", () => {
    const condition = new RequestEqualsCondition("attr1", "val1");
    expect(condition.match(objWithAttr1)).toBeTruthy();
  });

  it("shoud not match, if item doesn't have the defined attribute", () => {
    const condition = new RequestEqualsCondition("attr2", "val1");
    expect(condition.match(objWithAttr1)).toBeFalsy();
  });

  it("shoud not match, if item has the defined attribute with wrong value", () => {
    const condition = new RequestEqualsCondition("attr1", "val2");
    expect(condition.match(objWithAttr1)).toBeFalsy();
  });


  it("shoud matchId, if the condition expects an attribute 'id' with a value if type number", () => {
    const condition = new RequestEqualsCondition("id", 92);
    expect(condition.matchId(92)).toBeTruthy();
  });

  it("shoud not matchId, if the condition expects not an attribute 'id'", () => {
    const condition = new RequestEqualsCondition("idd", 92);
    expect(condition.matchId(92)).toBeFalsy();
  });

  it("shoud not matchId, if the condition expects an attribute 'id' with a value not of type number", () => {
    const condition = new RequestEqualsCondition("idd", "92");
    expect(condition.matchId(92)).toBeFalsy();
  });

  it("shoud not matchId, if the condition expects an attribute 'id' with a wrong number as value", () => {
    const condition = new RequestEqualsCondition("id", 93);
    expect(condition.matchId(92)).toBeFalsy();
  });

  it("isRangeCondition false", () => {
    const condition = new RequestEqualsCondition(null, null);
    expect(condition.isRangeCondition()).toBeFalsy();
  });

  it("should toString contains ==", () => {
    const condition = new RequestEqualsCondition("idd", 93);
    expect(condition.toString()).toBe("idd==93");
  });
});
