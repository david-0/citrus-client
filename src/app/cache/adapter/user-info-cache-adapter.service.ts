import {Injectable} from "@angular/core";
import {IUserInfo} from "citrus-common";
import {isUndefined} from "util";
import {GenericCacheAdapterService} from "../generic-cache-adapter.service";
import {AddressCacheService} from "../cache/address-cache.service";
import {UserInfoCacheService} from "../cache/user-info-cache.service";

@Injectable()
export class UserInfoCacheAdapterService extends GenericCacheAdapterService<IUserInfo> {
  constructor(userInfoCache: UserInfoCacheService, private adddressCache: AddressCacheService) {
    super(userInfoCache);
  }

  protected updateChilds(item: IUserInfo) {
    if (!isUndefined(item.addresses)) {
      this.adddressCache.updateEntries(item.addresses);
    }
    if (!isUndefined(item.customerOrders)) {
      // update gpsLocation cache
    }
  }

  protected loadedTypes(item: IUserInfo): string[] {
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
