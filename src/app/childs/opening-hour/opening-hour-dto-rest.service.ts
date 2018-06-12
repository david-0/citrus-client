import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})

export class OpeningHourDtoRestService extends GenericRestService<OpeningHourDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/openingHour");
  }
}
