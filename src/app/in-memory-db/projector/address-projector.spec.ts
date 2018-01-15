import {Caches} from "../cache/caches";
import {TAddress} from "../model/t/t-address";
import {TUser} from "../model/t/t-user";
import {AddressProjector} from "./address-projector";
import {Projectors} from "./projectors";

describe("AddressProjector", () => {
  it("project object with userId, without user", () => {
    const actual = new TAddress();
    actual.id = 11;
    actual.city = "city";
    actual.userId = 14;

    const cacheSpy = jasmine.createSpyObj(["synchronizeOne"]);
    const caches = new Caches();
    spyOn(caches, "getCache").and.callFake(typeName => cacheSpy);

    const projector = new AddressProjector(caches, null);
    projector.projectOneAndUpdateCache(actual);

    expect(caches.getCache).toHaveBeenCalledTimes(1);
    expect(caches.getCache).toHaveBeenCalledWith("Address");
    expect(cacheSpy.synchronizeOne).toHaveBeenCalledTimes(1);
    const result = cacheSpy.synchronizeOne.calls.argsFor(0);
    expect(result[0].city).toBe("city");
    expect(result[0].userId).toBe(14);
    expect(result[0].user).toBeUndefined();
    expect(result[0].id).toBe(11);
  });

  it("project object without userId and with user", () => {
    const actual = new TAddress();
    actual.id = 11;
    actual.city = "city";
    actual.userId = undefined;
    actual.user = new TUser();

    const addressCacheSpy = jasmine.createSpyObj(["synchronizeOne"]);
    const userCacheSpy = jasmine.createSpyObj(["synchronizeOne"]);
    const caches = new Caches();
    spyOn(caches, "getCache").and.callFake(typeName => typeName === "Address" ? addressCacheSpy : userCacheSpy);

    const projectors = new Projectors();
    const userProjectorSpy = {
      projectOneAndUpdateCache: jasmine.createSpy("projectOneAndUpdateCache").and.returnValue({id: 15})
    };
    spyOn(projectors, "get").and.callFake(typeName => userProjectorSpy);

    const projector = new AddressProjector(caches, projectors);
    projector.projectOneAndUpdateCache(actual);

    expect(caches.getCache).toHaveBeenCalledTimes(1);
    expect(caches.getCache).toHaveBeenCalledWith("Address");

    expect(addressCacheSpy.synchronizeOne).toHaveBeenCalledTimes(1);
    const addressResult = addressCacheSpy.synchronizeOne.calls.argsFor(0);
    expect(addressResult[0].city).toBe("city");
    expect(addressResult[0].userId).toBe(15);
    expect(addressResult[0].user).toBeUndefined();
    expect(addressResult[0].id).toBe(11);

    expect(userProjectorSpy.projectOneAndUpdateCache).toHaveBeenCalledTimes(1);
    const userResult = userProjectorSpy.projectOneAndUpdateCache.calls.argsFor(0);
  });
});
