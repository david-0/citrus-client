import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {UserDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class UserWithAllDtoRestService extends GenericRestService<UserDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/user/withAll");
  }
}
