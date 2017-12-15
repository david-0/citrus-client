import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IUserInfo} from "citrus-common";
import {GenericDatabaseBackend} from "../../table-support/generic-database-backend";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {UserInfoCacheAdapterService} from "../../cache/adapter/user-info-cache-adapter.service";

@Injectable()
export class UserInfoDatabaseService extends GenericDatabaseBackend<IUserInfo> {
  constructor(http: HttpClient, userInfoCacheAdapter: UserInfoCacheAdapterService) {
    super(new GenericRestService(http, "http://localhost:3001/api/user"),
      userInfoCacheAdapter,
      ["number", "email", "name", "prename", "phone", "mobile"],
      [], ["Address"]);
  }
}
