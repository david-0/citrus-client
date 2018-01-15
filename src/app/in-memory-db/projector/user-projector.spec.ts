import {Caches} from "../cache/caches";
import {CAddress} from "../model/c/c-address";
import {TUser} from "../model/t/t-user";
import {Projectors} from "./projectors";
import {UserProjector} from "./user-projector";

describe("UserProjector", () => {
  it("project object with addressIds, without addresses", () => {
    const addressIds = [11, 12];
    const actual = new TUser();
    actual.id = 14;
    actual.name = "name";
    actual.addressIds = addressIds;

    const cacheSpy = jasmine.createSpyObj(["synchronizeOne"]);
    const caches = new Caches();
    spyOn(caches, "getCache").and.callFake(typeName => cacheSpy);

    const projector = new UserProjector(caches, null);
    projector.projectOneAndUpdateCache(actual);

    expect(caches.getCache).toHaveBeenCalledTimes(1);
    expect(caches.getCache).toHaveBeenCalledWith("User");
    expect(cacheSpy.synchronizeOne).toHaveBeenCalledTimes(1);
    const result = cacheSpy.synchronizeOne.calls.argsFor(0);
    expect(result[0].name).toBe("name");
    expect(result[0].addressIds).toBe(addressIds);
    expect(result[0].addresses).toBeUndefined();
    expect(result[0].id).toBe(14);
  });

  it("project object without addressIds and with addresses", () => {
    const actual = new TUser();
    actual.id = 11;
    actual.name = "name";
    actual.addressIds = undefined;
    const dummyAddresses = [jasmine.createSpyObj(["dummy"])];
    actual.addresses = dummyAddresses;

    const userCacheSpy = jasmine.createSpyObj(["synchronizeOne"]);
    const addressCacheSpy = jasmine.createSpyObj(["synchronizeMany"]);
    const caches = new Caches();
    spyOn(caches, "getCache").and.callFake(typeName => typeName === "Address" ? addressCacheSpy : userCacheSpy);

    const projectors = new Projectors();
    const addressProjectorSpy = {
      projectManyAndUpdateCache: jasmine.createSpy("projectManyAndUpdateCache").and.returnValue([new CAddress(15), new CAddress(16)])
    };
    spyOn(projectors, "get").and.callFake(typeName => addressProjectorSpy);

    const projector = new UserProjector(caches, projectors);
    projector.projectOneAndUpdateCache(actual);

    expect(caches.getCache).toHaveBeenCalledTimes(1);
    expect(caches.getCache).toHaveBeenCalledWith("User");

    expect(userCacheSpy.synchronizeOne).toHaveBeenCalledTimes(1);
    const addressResult = userCacheSpy.synchronizeOne.calls.argsFor(0);
    expect(addressResult[0].id).toBe(11);
    expect(addressResult[0].name).toBe("name");
    expect(addressResult[0].addressIds).toEqual([15, 16]);
    expect(addressResult[0].addresses).toBeUndefined();

    expect(addressProjectorSpy.projectManyAndUpdateCache).toHaveBeenCalledTimes(1);
    const userResult = addressProjectorSpy.projectManyAndUpdateCache.calls.argsFor(0);
  });
});
