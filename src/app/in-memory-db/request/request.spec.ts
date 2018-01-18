import {Request} from "./request";
import {RequestField} from "./request-field";

describe("Request", () => {
  let mockConditionTrue;
  let mockConditionFalse;
  let mockField1;
  let mockField2;
  beforeEach(() => {
    mockConditionTrue = {
      "match": obj => true,
      "matchId": id => true,
      "isRangeCondition": () => true,
      "toString": () => "dummyTrue"
    };
    mockConditionFalse = {
      "match": obj => false,
      "matchId": id => false,
      "isRangeCondition": () => false,
      "toString": () => "dummyFalse",
    };
    mockField1 = new RequestField("name1", "string");
    mockField2 = new RequestField("name2", "string");
  });

  it("should not match, if no condition", () => {
    const req = new Request("Address");
    expect(req.match({})).toBeFalsy();
  });
  it("should not match, if condition match eval false", () => {
    const req = new Request("Address", undefined, undefined, mockConditionFalse, []);
    expect(req.match({})).toBeFalsy();
  });
  it("should match, if condition match eval true", () => {
    const req = new Request("Address", undefined, undefined, mockConditionTrue, []);
    expect(req.match({})).toBeTruthy();
  });

  it("should not matchId, if no condition", () => {
    const req = new Request("Address");
    expect(req.matchId(1)).toBeFalsy();
  });
  it("should not matchId, if condition matchId eval false", () => {
    const req = new Request("Address", undefined, undefined, mockConditionFalse, []);
    expect(req.matchId(1)).toBeFalsy();
  });
  it("should matchId, if condition matchId eval true", () => {
    const req = new Request("Address", undefined, undefined, mockConditionTrue, []);
    expect(req.matchId(1)).toBeTruthy();
  });

  it("areAllFieldsIncluded true, if the only one input field is included in the request", () => {
    const req = new Request("Address", undefined, undefined, mockConditionTrue, [mockField1, mockField2]);
    expect(req.areAllFieldsIncluded([mockField1])).toBeTruthy();
  });
  it("areAllFieldsIncluded true, if all input fields are included in the request", () => {
    const req = new Request("Address", undefined, undefined, mockConditionTrue, [mockField1, mockField2]);
    expect(req.areAllFieldsIncluded([mockField1, mockField2])).toBeTruthy();
  });
  it("areAllFieldsIncluded false, if no input field is included in the request", () => {
    const req = new Request("Address", undefined, undefined, mockConditionTrue, [mockField1]);
    expect(req.areAllFieldsIncluded([mockField2])).toBeFalsy();
  });
  it("areAllFieldsIncluded false, if not all input fields are included in the request", () => {
    const req = new Request("Address", undefined, undefined, mockConditionTrue, [mockField1]);
    expect(req.areAllFieldsIncluded([mockField1, mockField2])).toBeFalsy();
  });

  it("isSubRequest false, if request has conditions", () => {
    const req = new Request("Address", undefined, undefined, mockConditionTrue);
    const subRequest = new Request("Address");
    expect(req.isSubRequest(subRequest)).toBeFalsy();
  });
  it("isSubRequest false, if request has no conditions but different types", () => {
    const req = new Request("Address");
    const subRequest = new Request("User");
    expect(req.isSubRequest(subRequest)).toBeFalsy();
  });
  it("isSubRequest true, if requst has no condion and no fields", () => {
    const req = new Request("Address");
    const subRequest = new Request("Address");
    expect(req.isSubRequest(subRequest)).toBeTruthy();
  });
  it("isSubRequest false, if requst has no condion and no fields, subrequest one field", () => {
    const req = new Request("Address");
    const subRequest = new Request("Address", undefined, undefined, undefined, [mockField1]);
    expect(req.isSubRequest(subRequest)).toBeFalsy();
  });
  it("isSubRequest true, if requst has no condion and one fields, subrequest no field", () => {
    const req = new Request("Address", undefined, undefined, undefined, [mockField1]);
    const subRequest = new Request("Address");
    expect(req.isSubRequest(subRequest)).toBeTruthy();
  });
  it("isSubRequest true, if requst has no condion and both the same field", () => {
    const req = new Request("Address", undefined, undefined, undefined, [mockField1]);
    const subRequest = new Request("Address", undefined, undefined, undefined, [mockField1]);
    expect(req.isSubRequest(subRequest)).toBeTruthy();
  });

  it("toString", () => {
    const req = new Request("Address");
    expect(typeof req.toString()).toEqual("string");
  });
});
