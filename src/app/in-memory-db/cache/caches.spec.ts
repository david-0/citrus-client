import {Caches} from "./caches";
import createSpyObj = jasmine.createSpyObj;

describe("Caches", () => {
  it("should be able to add and get", () => {
    const caches = new Caches();
    const addressCacheSpy = createSpyObj("CAddressSpy", ["dummy"]);
    caches.addCache("Address", addressCacheSpy);
    expect(caches.getCache("Address")).toBe(addressCacheSpy);
  });

  it("should be able to add and get multiple caches", () => {
    const caches = new Caches();
    const addressCacheSpy = createSpyObj("CAddressSpy", ["dummy"]);
    const userCacheSpy = createSpyObj("CUserSpy", ["dummy"]);
    caches.addCache("Address", addressCacheSpy);
    caches.addCache("User", userCacheSpy);
    expect(caches.getCache("Address")).toBe(addressCacheSpy);
    expect(caches.getCache("User")).toBe(userCacheSpy);
  });
});
