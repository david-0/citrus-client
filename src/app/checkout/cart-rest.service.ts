import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CustomerOrderDto} from "citrus-common";
import {CartDto} from "citrus-common/lib/dto/cart-dto";
import {GenericRestDiffReturnService} from "../table-support/generic-rest-diff-return.service";
import {RestUrlPrefixService} from "../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class CartRestService extends GenericRestDiffReturnService<CartDto, CustomerOrderDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/cart");
  }
}
