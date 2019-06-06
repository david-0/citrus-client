import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {RoleDto} from "citrus-common/lib/dto/role-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class RoleWithUsersDtoRestService extends GenericRestService<RoleDto> {

  constructor(http: HttpClient, @Inject("baseUrl")  baseUrl: string) {
    super(http, baseUrl + "/role/withUsers");
  }
}
