import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {AddressDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable()
export class AddressDtoRestService extends GenericRestService<AddressDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/address");
  }
}
