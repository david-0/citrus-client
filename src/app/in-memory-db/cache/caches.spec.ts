import {CUser} from "../model/c/c-user";
import {Caches} from "./caches";
import {CAddress} from "../model/c/c-address";
import {TypeCache} from "./type-cache";

describe("Caches", () => {
  it("should be able to add and get", () => {
    const caches = new Caches();
    const typeCache = new TypeCache<CAddress>();
    typeCache.synchronizeOne(new CAddress(12));
    caches.addCache("Address", typeCache);
    expect(caches.getCache("Address")).toBe(typeCache);
  });

  it("should be able to add and get multiple caches", () => {
    const caches = new Caches();
    const typeCacheAddress = new TypeCache<CAddress>();
    typeCacheAddress.synchronizeOne(new CAddress(12));
    const typeCacheUser = new TypeCache<CUser>();
    typeCacheUser.synchronizeOne(new CUser(11));
    caches.addCache("Address", typeCacheAddress);
    caches.addCache("User", typeCacheUser);
    expect(caches.getCache("Address")).toBe(typeCacheAddress);
    expect(caches.getCache("User")).toBe(typeCacheUser);
  });
});
