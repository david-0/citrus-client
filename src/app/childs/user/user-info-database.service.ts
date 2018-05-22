import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserInfoDto} from "citrus-common";
import {UserInfoCacheAdapterService} from "../../cache/adapter/user-info-cache-adapter.service";
import {InMemoryDatabaseService} from "../../in-memory-db/in-memory-database.service";
import {GenericDatabaseBackend} from "../../table-support/generic-database-backend";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable()
export class UserInfoDatabaseService extends GenericDatabaseBackend<UserInfoDto> {
  constructor(http: HttpClient,
              userInfoCacheAdapter: UserInfoCacheAdapterService,
              inMemoryDb: InMemoryDatabaseService) {
    super(new GenericRestService(http, "http://localhost:3001/api/user"),
      userInfoCacheAdapter, inMemoryDb,
      ["number", "email", "name", "prename", "phone", "mobile"],
      [], ["Address"]);
  }
}
