import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {OrderArchiveDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class OrderArchiveDtoRestService extends GenericRestService<OrderArchiveDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/orderArchive");
  }
}
