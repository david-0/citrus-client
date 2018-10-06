import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class UserWithAllDtoRestService extends GenericRestService<UserDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/user/withAll");
  }
}
