import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {OpeningHourDto} from "citrus-common/lib/dto/opening-hour-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})

export class OpeningHourDtoRestService extends GenericRestService<OpeningHourDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/openingHour");
  }
}
