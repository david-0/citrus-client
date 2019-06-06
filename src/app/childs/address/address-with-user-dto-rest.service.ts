import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {AddressDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root",
})
export class AddressWithUserDtoRestService extends GenericRestService<AddressDto> {
  constructor(http: HttpClient,
              @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/address/withUser");
  }
}
