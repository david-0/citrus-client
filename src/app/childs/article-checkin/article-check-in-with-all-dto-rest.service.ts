import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {ArticleCheckInDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root"
})
export class ArticleCheckInWithAllDtoRestService extends GenericRestService<ArticleCheckInDto> {
  constructor(http: HttpClient,
              @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/articleCheckIn/withAll");
  }
}
