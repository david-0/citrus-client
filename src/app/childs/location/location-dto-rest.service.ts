import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {LocationDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class LocationDtoRestService extends GenericRestService<LocationDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/location");
  }
}
