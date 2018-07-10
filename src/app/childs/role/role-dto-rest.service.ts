import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class RoleDtoRestService extends GenericRestService<RoleDto> {

  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/role");
  }
}
