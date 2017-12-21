import {Injectable} from "@angular/core";
import {IAddress} from "citrus-common";
import {isUndefined} from "util";
import {AddressCacheService} from "../cache/address-cache.service";
import {UserInfoCacheService} from "../cache/user-info-cache.service";
import {GenericCacheAdapterService} from "../generic-cache-adapter.service";

@Injectable()
export class AddressCacheAdapterService extends GenericCacheAdapterService<IAddress> {
  constructor(addressCache: AddressCacheService, private userInfoCache: UserInfoCacheService) {
    super(addressCache);
  }

  protected fetchChilds(item: IAddress): boolean {
    let fetchAll = false;
    if (isUndefined(item.user) && item["userId"]) {
      const alreadyCached = this.userInfoCache.get(item["userId"]);
      if (!!alreadyCached) {
        item.user = alreadyCached;
        fetchAll = true;
      }
    }
    if (isUndefined(item.gpsLocation)) {
      // update gpsLocation cache
    }
    return fetchAll;
  }

  protected updateChilds(item: IAddress) {
    this.replaceChildsWithAlreadyCachedItem(item);
    if (!!item.user) {
      this.userInfoCache.update(item.user);
    }
    if (!isUndefined(item.gpsLocation)) {
      // update gpsLocation cache
    }
  }

  private replaceChildsWithAlreadyCachedItem(item: IAddress) {
    if (!!item.user) {
      const alreadyCached = this.userInfoCache.get(item.user.id);
      if (!!alreadyCached) {
        item.user = alreadyCached;
      }
    }
  }

  protected loadedTypes(item: IAddress): string[] {
    const loadedTypes = [];
    if (!isUndefined(item.user)) {
      loadedTypes.push("User");
    }
    if (!isUndefined(item.gpsLocation)) {
      loadedTypes.push("GpsLocation");
    }
    return loadedTypes;
  }
}
