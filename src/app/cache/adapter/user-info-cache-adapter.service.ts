import {Injectable} from "@angular/core";
import {IUser, IWhereDefinition} from "citrus-common";
import {isUndefined} from "util";
import {AddressCacheService} from "../cache/address-cache.service";
import {UserInfoCacheService} from "../cache/user-info-cache.service";
import {GenericCacheAdapterService} from "../generic-cache-adapter.service";

@Injectable()
export class UserInfoCacheAdapterService extends GenericCacheAdapterService<IUser> {
  constructor(userInfoCache: UserInfoCacheService, private adddressCache: AddressCacheService) {
    super(userInfoCache);
  }

  protected fetchChilds(item: IUser): boolean {
    let fetchAll = false;
    const scope: IWhereDefinition = {columnName: "userId", id: item.id};
    if (isUndefined(item.addresses) && this.adddressCache.isFullyLoaded(scope)) {
      item.addresses = this.adddressCache.getAll(scope);
      fetchAll = true;
    }
    if (isUndefined(item.customerOrders)) {
      // update gpsLocation cache
    }
    return fetchAll;
  }

  protected updateChilds(item: IUser) {
    if (!isUndefined(item.addresses)) {
      this.replaceChildsWithAlreadyCachedItem(item);
      this.adddressCache.updateEntries(item.addresses, {columnName: "userId", id: item.id});
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
      loadedTypes.push("Address");
    }
    if (!isUndefined(item.customerOrders)) {
      loadedTypes.push("CustomerOrder");
    }
    return loadedTypes;
  }

}
