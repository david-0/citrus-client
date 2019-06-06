import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {UnitOfMeasurementDto} from "citrus-common/lib/dto/unit-of-measurement-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";

@Injectable()
export class UnitOfMeasurementDtoRestService extends GenericRestService<UnitOfMeasurementDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/unitOfMeasurement");
  }
}
