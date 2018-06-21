import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CustomerOrderItemDto} from "citrus-common/lib/dto/customer-order-item-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class CustomerOrderItemDtoRestService extends GenericRestService<CustomerOrderItemDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/customerOrderItem");
  }
}
