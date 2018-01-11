import {CAddress} from "../model/c/c-address";
import {ImmutableWrapper} from "./immutable-wrapper";

describe("ImmutableWrapper", () => {
  it("should wrap", () => {
    const a = new CAddress(12);
    a.name = "a";
    const a1 = ImmutableWrapper.wrap(a);
    expect(a1.name).toBe("a");
    expect(() => a1.name = "b").toThrow();
    a.name = "aNew";
    expect(a1.name).toBe("aNew");
  });
});
