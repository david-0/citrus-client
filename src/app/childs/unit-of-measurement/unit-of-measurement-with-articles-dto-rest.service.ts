import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UnitOfMeasurementDto} from "citrus-common/lib/dto/unit-of-measurement-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root",
})
export class UnitOfMeasurementWithArticlesDtoRestService extends GenericRestService<UnitOfMeasurementDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/unitOfMeasurementWithArticles");
  }
}
