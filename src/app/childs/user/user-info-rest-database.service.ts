import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {IUserInfo} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestBackendDatabase} from "../../table-support/rest-backend-database";

@Injectable()
export class UserInfoRestDatabaseService extends RestBackendDatabase<IUserInfo> {

  constructor(http: HttpClient) {
    super(new GenericRestService(http, "http://localhost:3001/api/user", [], ["Address"]));
  }

}
