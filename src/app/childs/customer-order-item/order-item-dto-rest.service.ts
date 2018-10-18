import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {OrderItemDto} from "citrus-common/lib/dto/order-item-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class OrderItemDtoRestService extends GenericRestService<OrderItemDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/orderItem");
  }
}
