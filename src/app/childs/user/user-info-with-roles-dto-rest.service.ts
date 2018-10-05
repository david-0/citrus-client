import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserInfoDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable()
export class UserInfoWithRolesDtoRestService extends GenericRestService<UserInfoDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/user/withRoles");
  }
}
