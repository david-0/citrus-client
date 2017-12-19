import {Injectable} from "@angular/core";
import {IUser} from "citrus-common";
import {isUndefined} from "util";
import {AddressCacheService} from "../cache/address-cache.service";
import {UserInfoCacheService} from "../cache/user-info-cache.service";
import {GenericCacheAdapterService} from "../generic-cache-adapter.service";

@Injectable()
export class UserInfoCacheAdapterService extends GenericCacheAdapterService<IUser> {
  constructor(userInfoCache: UserInfoCacheService, private adddressCache: AddressCacheService) {
    super(userInfoCache);
  }

  protected fetchChilds(item: IUser) {
    if (isUndefined(item.addresses) && this.adddressCache.isFullyLoaded()) {
      item.addresses = this.adddressCache.getAll().filter(address => address["userId"] === item.id);
    }
    if (isUndefined(item.customerOrders)) {
      // update gpsLocation cache
    }
  }

  protected updateChilds(item: IUser) {
    if (!isUndefined(item.addresses)) {
      this.replaceChildsWithAlreadyCachedItem(item);
      this.adddressCache.updateEntries(item.addresses);
    }
    if (!isUndefined(item.customerOrders)) {
      // update gpsLocation cache
    }
  }

  private replaceChildsWithAlreadyCachedItem(item: IUser) {
    if (!!item.addresses) {
      item.addresses = item.addresses.map(address => {
        const alreadyCached = this.adddressCache.get(address.id);
        if (!!alreadyCached) {
          return alreadyCached;
        }
        return address;
      });
    }
  }


  protected loadedTypes(item: IUser): string[] {
    const loadedTypes = [];
    if (!isUndefined(item.addresses)) {
      loadedTypes.push("Addresses");
    }
    if (!isUndefined(item.customerOrders)) {
      loadedTypes.push("CustomerOrders");
    }
    return loadedTypes;
  }

}
