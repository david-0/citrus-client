import {HttpClient} from "@angular/common/http";
import {DtoId} from "citrus-common/lib/dto/dto-id";
import {GenericRestDiffReturnService} from "./generic-rest-diff-return.service";

export class GenericRestService<T extends DtoId> extends GenericRestDiffReturnService<T, T>{

  constructor(http: HttpClient, restUrl: string) {
    super(http, restUrl);
  }
}
