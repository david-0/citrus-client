import {Projectors} from "./projectors";
import createSpyObj = jasmine.createSpyObj;

describe("Projectors", () => {
  it("should be able to add and get", () => {
    const projectors = new Projectors();
    const addressProjectorSpy = createSpyObj("addressSpy", ["dummy"]);
    projectors.add("Address", addressProjectorSpy);
    expect(projectors.get("Address")).toBe(addressProjectorSpy);
  });

  it("should be able to add and get multiple projectors", () => {
    const projectors = new Projectors();
    const addressProjectorSpy = createSpyObj("addressSpy", ["dummy"]);
    const userProjectorSpy = createSpyObj("userSpy", ["dummy"]);
    projectors.add("Address", addressProjectorSpy);
    projectors.add("User", userProjectorSpy);
    expect(projectors.get("Address")).toBe(addressProjectorSpy);
    expect(projectors.get("User")).toBe(userProjectorSpy);
  });
});
