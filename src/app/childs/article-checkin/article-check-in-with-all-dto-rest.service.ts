import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ArticleCheckInDto} from "citrus-common";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class ArticleCheckInWithAllDtoRestService extends GenericRestService<ArticleCheckInDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/articleCheckIn/withAll");
  }
}
