import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {OrderDto} from "citrus-common";
import {CartDto} from "citrus-common/lib/dto/cart-dto";
import {GenericAddWithDifferentReturnService} from "../table-support/generic-add-with-different-return.service";

@Injectable({
  providedIn: "root"
})
export class CartRestService extends GenericAddWithDifferentReturnService<CartDto, OrderDto> {
  constructor(http: HttpClient, @Inject("baseUrl") baseUrl: string) {
    super(http, baseUrl + "/cart");
  }
}
