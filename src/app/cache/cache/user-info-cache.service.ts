import {Injectable} from "@angular/core";
import {IUser} from "citrus-common";
import {GenericCacheService} from "../generic-cache.service";

@Injectable()
export class UserInfoCacheService extends GenericCacheService<IUser> {
}
