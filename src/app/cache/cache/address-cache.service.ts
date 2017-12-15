import {Injectable} from "@angular/core";
import {IAddress} from "citrus-common";
import {GenericCacheService} from "../generic-cache.service";

@Injectable()
export class AddressCacheService extends GenericCacheService<IAddress> {

}
