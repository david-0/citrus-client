import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CartDto} from "citrus-common/lib/dto/cart-dto";
import {GenericRestService} from "../table-support/generic-rest.service";
import {RestUrlPrefixService} from "../table-support/rest-url-prefix.service";

@Injectable({
  providedIn: "root"
})
export class CartRestService extends GenericRestService<CartDto> {
  constructor(http: HttpClient, private restUrlPrefix: RestUrlPrefixService) {
    super(http, restUrlPrefix.getApiRestPrefix() + "/cart");
  }
}
