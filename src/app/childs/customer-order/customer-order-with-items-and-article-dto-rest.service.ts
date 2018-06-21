import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CustomerOrderDto} from "citrus-common/lib/dto/customer-order-dto";
import {GenericRestService} from "../../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class CustomerOrderWithItemsAndArticleDtoRestService extends GenericRestService<CustomerOrderDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/customerOrderWithItemsAndArticles");
  }
}
