import {CacheService} from "./cache-service";
import createSpyObj = jasmine.createSpyObj;

describe("CacheService", () => {
  it("should be able to add and get", () => {
    const caches = new CacheService();
    const addressCacheSpy = createSpyObj("CAddressSpy", ["dummy"]);
    caches.addCache("Address", addressCacheSpy);
    expect(caches.getCache("Address")).toBe(addressCacheSpy);
  });

  it("should be able to add and get multiple caches", () => {
    const caches = new CacheService();
    const addressCacheSpy = createSpyObj("CAddressSpy", ["dummy"]);
    const userCacheSpy = createSpyObj("CUserSpy", ["dummy"]);
    caches.addCache("Address", addressCacheSpy);
    caches.addCache("User", userCacheSpy);
    expect(caches.getCache("Address")).toBe(addressCacheSpy);
    expect(caches.getCache("User")).toBe(userCacheSpy);
  });
});
