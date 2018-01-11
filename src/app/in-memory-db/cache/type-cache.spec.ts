import {CAddress} from "../model/c/c-address";
import {TypeCache} from "./type-cache";

describe("TypeCache", () => {

  it("synchronize should decouple input from from cache", () => {
    const typeCache = new TypeCache<CAddress>();
    const a = new CAddress(12);
    a.name = "a";
    const a1 = typeCache.synchronizeOne(a);
    expect(a1.name).toBe("a");
    a.name = "a1";
    expect(a1.name).toBe("a");
  });

  it("synchronizeOne a(id=12) should be updated by b(id=12)", () => {
    const typeCache = new TypeCache<CAddress>();
    const a = new CAddress(12);
    a.name = "a";
    const a1 = typeCache.synchronizeOne(a);
    expect(a1.name).toBe("a");

    const b = new CAddress(12);
    b.name = "b";
    const b1 = typeCache.synchronizeOne(b);
    expect(b1.name).toEqual("b");

    expect(a1.name).toBe("b");
  });

  it("synchronizeMany", () => {
    const typeCache = new TypeCache<CAddress>();
    const a = new CAddress(11);
    a.name = "a";
    const b = new CAddress(12);
    b.name = "b";

    const many = typeCache.synchronizeMany([a, b]);
    expect(many[0].name).toBe("a");
    expect(many[1].name).toBe("b");
  });

  it("synchronizeMany with same id's, last should win, return multiple the same obj", () => {
    const typeCache = new TypeCache<CAddress>();
    const a = new CAddress(12);
    a.name = "a";
    const b = new CAddress(12);
    b.name = "b";

    const many = typeCache.synchronizeMany([a, b]);
    expect(many[0].name).toBe("b");
    expect(many[1].name).toBe("b");
  });

  it("has entry", () => {
    const typeCache = new TypeCache<CAddress>();
    const a = new CAddress(12);
    a.name = "a";
    typeCache.synchronizeOne(a);
    expect(typeCache.has(12)).toBeTruthy();
  });

  it("get entry", () => {
    const typeCache = new TypeCache<CAddress>();
    const a = new CAddress(12);
    a.name = "a";
    typeCache.synchronizeOne(a);
    const a1 = typeCache.get(12);
    expect(a1.name).toBe("a");
  });

  it("getAll entry", () => {
    const typeCache = new TypeCache<CAddress>();
    const a = new CAddress(11);
    a.name = "a";
    typeCache.synchronizeOne(a);
    const b = new CAddress(12);
    b.name = "b";
    typeCache.synchronizeOne(b);
    const all = typeCache.getAll();
    expect(all.length).toBe(2);
    expect(all.find(a2 => a2.id === 11).name).toBe("a");
    expect(all.find(a2 => a2.id === 12).name).toBe("b");
  });

  it("delete entry", () => {
    const typeCache = new TypeCache<CAddress>();
    const a = new CAddress(11);
    a.name = "a";
    typeCache.synchronizeOne(a);
    const b = new CAddress(12);
    b.name = "b";
    typeCache.synchronizeOne(b);
    typeCache.delete(11);
    expect(typeCache.has(11)).toBeFalsy();
  });
});
