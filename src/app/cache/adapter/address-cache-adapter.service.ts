import {Injectable} from "@angular/core";
import {IAddress} from "citrus-common";
import {isUndefined} from "util";
import {UserInfoCacheService} from "../cache/user-info-cache.service";
import {AddressCacheService} from "../cache/address-cache.service";
import {GenericCacheAdapterService} from "../generic-cache-adapter.service";

@Injectable()
export class AddressCacheAdapterService extends GenericCacheAdapterService<IAddress> {

  constructor(addressCache: AddressCacheService, private userInfoCache: UserInfoCacheService) {
    super(addressCache);
  }

  protected updateChilds(item: IAddress) {
    if (!isUndefined(item.user)) {
      this.userInfoCache.update(item.user);
    }
    if (!isUndefined(item.gpsLocation)) {
      // update gpsLocation cache
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
