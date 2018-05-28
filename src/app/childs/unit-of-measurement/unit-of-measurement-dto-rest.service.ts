import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UnitOfMeasurementDto} from "citrus-common/lib/dto/unit-of-measurement-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable()
export class UnitOfMeasurementDtoRestService extends GenericRestService<UnitOfMeasurementDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getRestPrefix() + "/unitOfMeasurement");
  }
}
