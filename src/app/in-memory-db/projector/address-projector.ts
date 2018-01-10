import {CAddress} from "../model/c/c-address";
import {TAddress} from "../model/t/t-address";
import {AbstractProjector} from "./abstract-projector";

export class AddressProjector extends AbstractProjector {
  public projectOneAndUpdateCache(tItem: TAddress): CAddress {
    const cAddress = new CAddress(tItem.id);
    cAddress.name = tItem.name;
    cAddress.prename = tItem.prename;
    cAddress.street = tItem.street;
    cAddress.number = tItem.number;
    cAddress.addition = tItem.addition;
    cAddress.zipcode = tItem.zipcode;
    cAddress.city = tItem.city;
    if (!!tItem.user) {
      cAddress.userId = this.projectors.get("CAddress").projectOneAndUpdateCache(tItem.user).id;
    } else {
      cAddress.userId = tItem.userId;
    }
    return this.caches.getCache("CAddress").synchronizeOne(cAddress);
  }
}
