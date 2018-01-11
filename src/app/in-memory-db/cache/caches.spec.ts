import {Caches} from "./caches";
import {CAddress} from "../model/c/c-address";
import {TypeCache} from "./type-cache";

describe("Caches", () => {
  it("should be able to add and get", () => {
    const caches = new Caches();
    const typeCache = new TypeCache<CAddress>();
    caches.addCache("Address", typeCache);
    expect(caches.getCache("Address")).toBe(typeCache);
  });
});
