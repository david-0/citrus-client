import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {UnitOfMeasurementDto} from "citrus-common/lib/dto/unit-of-measurement-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable({
  providedIn: "root",
})
export class UnitOfMeasurementWithArticlesDtoRestService extends GenericRestService<UnitOfMeasurementDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/unitOfMeasurement/withArticles");
  }
}
