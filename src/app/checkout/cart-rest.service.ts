import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {OrderDto} from "citrus-common";
import {CartDto} from "citrus-common/lib/dto/cart-dto";
import {GenericAddWithDifferentReturnService} from "../table-support/generic-add-with-different-return.service";
import {RestUrlPrefixService} from "../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class CartRestService extends GenericAddWithDifferentReturnService<CartDto, OrderDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/cart");
  }
}
