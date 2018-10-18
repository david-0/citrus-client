import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {OrderDto} from "citrus-common/lib/dto/order-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class OrderDtoRestService extends GenericRestService<OrderDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/order");
  }
}
