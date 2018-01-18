import {Request} from "./request";
import {RequestBuilder} from "./request-builder";
import createSpyObj = jasmine.createSpyObj;

describe("RequestBuilder", () => {
  it("create emtpy and build", () => {
    const request = new RequestBuilder("XYZ").build();
    expect(request.typeName).toBe("XYZ");
    expect(request.includedFields).toEqual([]);
    expect(request.condition).toBeUndefined();
    expect(request.order).toBeUndefined();
    expect(request.limit).toBeUndefined();
    expect(request.offset).toBeUndefined();
  });

  it("addCondition and build", () => {
    const builder = new RequestBuilder("XYZ");
    const dummyCondition = createSpyObj(["dummy"]);
    builder.addCondition(dummyCondition);
    const request = builder.build();
    expect(request.typeName).toBe("XYZ");
    expect(request.includedFields).toEqual([]);
    expect(request.condition).toEqual(dummyCondition);
    expect(request.order).toBeUndefined();
    expect(request.limit).toBeUndefined();
    expect(request.offset).toBeUndefined();
  });

  it("addField and build", () => {
    const builder = new RequestBuilder("XYZ");
    const dummyField = createSpyObj(["dummy"]);
    builder.addField(dummyField);
    const request = builder.build();
    expect(request.typeName).toBe("XYZ");
    expect(request.includedFields).toEqual([dummyField]);
    expect(request.condition).toBeUndefined();
    expect(request.order).toBeUndefined();
    expect(request.limit).toBeUndefined();
    expect(request.offset).toBeUndefined();
  });

  it("addFields and build", () => {
    const builder = new RequestBuilder("XYZ");
    const dummyField1 = createSpyObj(["dummy"]);
    const dummyField2 = createSpyObj(["dummy"]);
    builder.addFields([dummyField1, dummyField2]);
    const request = builder.build();
    expect(request.typeName).toBe("XYZ");
    expect(request.includedFields).toEqual([dummyField1, dummyField2]);
    expect(request.condition).toBeUndefined();
    expect(request.order).toBeUndefined();
    expect(request.limit).toBeUndefined();
    expect(request.offset).toBeUndefined();
  });

  it("addOrderDefintion and build", () => {
    const builder = new RequestBuilder("XYZ");
    const dummyOrderDefinition = createSpyObj(["dummy"]);
    builder.addOrderDefinition(dummyOrderDefinition);
    const request = builder.build();
    expect(request.typeName).toBe("XYZ");
    expect(request.includedFields).toEqual([]);
    expect(request.condition).toBeUndefined();
    expect(request.order).toEqual([dummyOrderDefinition]);
    expect(request.limit).toBeUndefined();
    expect(request.offset).toBeUndefined();
  });

  it("addOrderDefintions and build", () => {
    const builder = new RequestBuilder("XYZ");
    const dummyOrderDefinition1 = createSpyObj(["dummy"]);
    const dummyOrderDefinition2 = createSpyObj(["dummy"]);
    builder.addOrderDefinitions([dummyOrderDefinition1, dummyOrderDefinition2]);
    const request = builder.build();
    expect(request.typeName).toBe("XYZ");
    expect(request.includedFields).toEqual([]);
    expect(request.condition).toBeUndefined();
    expect(request.order).toEqual([dummyOrderDefinition1, dummyOrderDefinition2]);
    expect(request.limit).toBeUndefined();
    expect(request.offset).toBeUndefined();
  });

  it("addLimit and build", () => {
    const builder = new RequestBuilder("XYZ");
    builder.addLimit(15);
    const request = builder.build();
    expect(request.typeName).toBe("XYZ");
    expect(request.includedFields).toEqual([]);
    expect(request.condition).toBeUndefined();
    expect(request.order).toBeUndefined();
    expect(request.limit).toBe(15);
    expect(request.offset).toBeUndefined();
  });

  it("addLimit and build", () => {
    const builder = new RequestBuilder("XYZ");
    builder.addOffset(33);
    const request = builder.build();
    expect(request.typeName).toBe("XYZ");
    expect(request.includedFields).toEqual([]);
    expect(request.condition).toBeUndefined();
    expect(request.order).toBeUndefined();
    expect(request.limit).toBeUndefined();
    expect(request.offset).toBe(33);
  });

  it("create from request (with all fields set) and build", () => {
    const mockCondition = createSpyObj(["match", "matchId", "isRangeCondition"]);
    const input = new Request("XYZ", 12, 11, mockCondition, [], []);
    const request = RequestBuilder.createFromRequest(input).build();
    expect(request).toEqual(input);
  });

  it("create from request (with no field set) and build", () => {
    const input = new Request("XYZ");
    const request = RequestBuilder.createFromRequest(input).build();
    expect(request.typeName).toBe("XYZ");
    expect(request.includedFields).toEqual([]);
    expect(request.condition).toBeUndefined();
    expect(request.order).toBeUndefined();
    expect(request.limit).toBeUndefined();
    expect(request.offset).toBeUndefined();
  });
});
