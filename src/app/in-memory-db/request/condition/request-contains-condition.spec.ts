import {RequestContainsCondition} from "./request-contains-condition";

describe("RequestContainsCondition", () => {
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

  it("shoud match, if attribute with exact value", () => {
    const condition = new RequestContainsCondition(["attr1"], "val1");
    expect(condition.match(objWithAttr1)).toBeTruthy();
  });

  it("shoud match, if attribute startswith value", () => {
    const condition = new RequestContainsCondition(["attr1"], "val");
    expect(condition.match(objWithAttr1)).toBeTruthy();
  });

  it("shoud match, if attribute endswith value", () => {
    const condition = new RequestContainsCondition(["attr1"], "al1");
    expect(condition.match(objWithAttr1)).toBeTruthy();
  });

  it("shoud match, if attribute contains the value in the value middle", () => {
    const condition = new RequestContainsCondition(["attr1"], "al");
    expect(condition.match(objWithAttr1)).toBeTruthy();
  });

  it("shoud not match, if attribute contains only a substring of the value", () => {
    const condition = new RequestContainsCondition(["attr1"], "val1-");
    expect(condition.match(objWithAttr1)).toBeFalsy();
  });

  it("shoud not match, if item doesn't have one of the requested attributes", () => {
    const condition = new RequestContainsCondition(["attr2", "attr3"], "val1");
    expect(condition.match(objWithAttr1)).toBeFalsy();
  });

  it("shoud match, if item has one of the defined attributes with expected value", () => {
    const condition = new RequestContainsCondition(["attr0", "attr1", "attr2"], "val1");
    expect(condition.match(objWithAttr1)).toBeTruthy();
  });


  it("shoud matchId, if one attribute with name 'id' with a value if type number", () => {
    const condition = new RequestContainsCondition(["id"], 92);
    expect(condition.matchId(92)).toBeTruthy();
  });

  it("shoud matchId, if multiple attribute and at least one with name 'id' with a value if type number", () => {
    const condition = new RequestContainsCondition(["attr1", "id"], 92);
    expect(condition.matchId(92)).toBeTruthy();
  });

  it("shoud not matchId, if the condition expects not an attribute 'id'", () => {
    const condition = new RequestContainsCondition(["idd", "attr1"], 92);
    expect(condition.matchId(92)).toBeFalsy();
  });

  it("shoud not matchId, if the condition expects an attribute 'id' with a value not of type number", () => {
    const condition = new RequestContainsCondition(["id"], "92");
    expect(condition.matchId(92)).toBeFalsy();
  });

  it("shoud not matchId, if the condition expects an attribute 'id' with a wrong number as value", () => {
    const condition = new RequestContainsCondition(["id"], 93);
    expect(condition.matchId(92)).toBeFalsy();
  });

  it("isRangeCondition true", () => {
    const condition = new RequestContainsCondition(null, null);
    expect(condition.isRangeCondition()).toBeTruthy();
  });

  it("should toString contains ==", () => {
    const condition = new RequestContainsCondition(["id", "prename"], 93);
    expect(condition.toString()).toBe("[id,prename] contains 93");
  });
});
