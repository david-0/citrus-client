import {AbstractProjector} from "./abstract-projector";

describe("AbstractProjector", () => {
  it("projectManyAndUpdateCache should call projectOneAndUpdateCache n-times", () => {
    const projector = new class extends AbstractProjector {
      public projectOneAndUpdateCache(tItem: any): any {
        return tItem + 10;
      }
    }(null, null);

    const result = projector.projectManyAndUpdateCache([1, 2, 3]);
    expect(result).toEqual([11, 12, 13]);
  });
});
