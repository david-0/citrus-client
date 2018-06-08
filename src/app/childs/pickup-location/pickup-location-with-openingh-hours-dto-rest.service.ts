import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {PickupLocationDto} from "citrus-common/lib/dto/pickup-location-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class PickupLocationWithOpeninghHoursDtoRestService extends GenericRestService<PickupLocationDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/pickupLocationWithOpeningHours");
  }
}
