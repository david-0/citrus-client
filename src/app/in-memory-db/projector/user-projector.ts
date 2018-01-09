import {CUser} from "../model/c/c-user";
import {TUser} from "../model/t/t-user";
import {AbstractProjector} from "./abstract-projector";

export class UserProjector extends AbstractProjector<CUser, TUser> {
  public projectOneAndUpdateCache(tItem: TUser): CUser {
    const cUser = new CUser(tItem.id);
    cUser.email = tItem.email;
    cUser.number = tItem.number;
    cUser.name = tItem.name;
    cUser.prename = tItem.prename;
    cUser.phone = tItem.phone;
    cUser.mobile = tItem.mobile;
    if (!!tItem.addresses) {
      cUser.addressIds = this.projectors.get(CUser)
        .projectManyAndUpdateCache(tItem.addresses)
        .map(address => address.id);
    } else {
      cUser.addressIds = tItem.addressIds;
    }
    return this.caches.getCache(CUser).synchronizeOne(cUser);
  }
}
